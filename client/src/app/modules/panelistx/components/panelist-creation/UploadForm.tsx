import React, { useEffect, useState } from 'react'
import { uploadFormFields } from '../../../auth/models/FormFields'
import { renderFormField } from '../../../../core/components/FormTemplate'
import CustomButton from '../../../../core/components/CustomButton'
import type { StepFormProps } from '../../../../core/models/sharedComponent'
import { Form } from 'antd'
import { resetAllFormData, setStepData } from '../../../../core/features/multiStepStateReducer'
import { store, type AppDispatch, type RootState } from '../../../../store'
import { useDispatch, useSelector } from 'react-redux'
import { patchFilesData, prepareFormDataPayload } from '../../../../core/service/FormService'
import { useNavigate, useParams } from 'react-router-dom'
import { createPanelists, getPanelistById, updatePanelist, } from '../../../voter/features/userSlices'

const UploadForm: React.FC<StepFormProps> = ({ stepKey, onBack }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const currentItem: string = 'upload';
    const items = useSelector((state: RootState) => state.multiStepState[currentItem]);
    const { action, panelistId } = useParams<{ action?: string; panelistId?: string }>();



    useEffect(() => {
        if (items && Object.keys(items).length > 0) {
            form.setFieldsValue(items);
        } else if (action === "edit" && panelistId) {
            getOldItems();
        }
    }, [items, action, panelistId, form]);

    const getOldItems = async () => {
        if (action === "edit" && panelistId) {
            try {
                const resultAction = await dispatch(getPanelistById({ id: panelistId }));
                if (getPanelistById.fulfilled.match(resultAction)) {
                    const data = Array.isArray(resultAction.payload) ? resultAction.payload[0] : resultAction.payload;
                    form.setFieldsValue({
                        identityProof: patchFilesData(data?.identityProof, "identityProof"),
                        resume: patchFilesData(data?.resume, "resume"),
                        certification: patchFilesData(data?.certification, "certification"),
                        photo: patchFilesData(data?.photo, "photo"),
                    });
                } else {
                    console.error("Failed to fetch panelist details:", resultAction.payload);
                }
            } catch (error) {
                console.error("Failed to fetch panelist details:", error);
            }
        }
    };

    const handleSubmit = async () => {
        try {
            const currentStepPayload = await form.validateFields();

            dispatch(
                setStepData({
                    stepKey: stepKey || '',
                    data: currentStepPayload,
                })
            );

            const latestSteps = Object.values(
                (store.getState() as RootState).multiStepState
            );
            const mergedValues = latestSteps.reduce((acc, obj) => {
                return { ...acc, ...obj };
            }, {});

            // Prepare payload for API
            const payload = prepareFormDataPayload(mergedValues);

            let response;
            if (action === "edit" && panelistId) {
                // Import updatePanelist from userSlices if not already
                response = await dispatch(updatePanelist({ id: panelistId, payload: payload }));
            } else {
                response = await dispatch(createPanelists(payload));
                navigate('/super-panelist/panelists');
            }

            if (
                (action === "edit" && response.meta && response.meta.requestStatus === "fulfilled") ||
                (action === 'add' && createPanelists.fulfilled.match(response))
            ) {
                dispatch(resetAllFormData());
                navigate('/super-panelist/panelists');
            }
        } catch (error) {
            console.error('Validation or submission failed:', error);
        }
    };

    return (
        <>
            <Form layout="vertical" form={form}>
                <div className='grid grid-cols-2 gap-3'>
                    {uploadFormFields.map((field) => renderFormField(field))}
                </div>
                <div className='flex justify-between mt-6'>
                    <CustomButton label='Cancel' className='w-[30%]' onClick={onBack}></CustomButton>
                    <CustomButton label='Create Panelist' className='w-[30%]' type='primary' onClick={handleSubmit}></CustomButton>
                </div>
            </Form>
        </>
    );
};

export default UploadForm;
