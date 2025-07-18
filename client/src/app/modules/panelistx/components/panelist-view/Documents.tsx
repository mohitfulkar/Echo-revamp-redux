import React from 'react';
import { Icons } from '../../../../core/constants/Icon';

interface DocumentsProps {
    items: {
        resume?: string;
        certification?: string[];
        identityProof?: string[];
    };
}

const Documents: React.FC<DocumentsProps> = ({ items }) => {
    const { resume, certification = [], identityProof = [] } = items || {};

    return (
        <div className="bg-white shadow-sm p-5 rounded-lg">
            <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
                {Icons.barChart} Documents
            </h3>

            <div className='space-y-6'>
                <div>
                    <h2 className='h5'>Resume</h2>
                    {resume ? (
                        <div className="flex justify-between items-center p-3 hover:bg-gray-50 rounded">
                            <span className="text-gray-800">Resume</span>
                            <a
                                href={resume}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-gray-600"
                            >
                                {Icons.view}
                            </a>
                        </div>
                    ) : (
                        <div className="text-gray-400">No resume uploaded</div>
                    )}
                </div>
                <div>
                    <h2 className='h5'>{Icons.book} Certifications</h2>
                    <div>

                        {certification.length > 0 ? (
                            <div className=" mt-2 grid grid-cols-4 gap-3">
                                {certification?.map((link: string, index: number) => (
                                    <div
                                        className="flex justify-between items-center p-3 hover:bg-gray-50 rounded"
                                    >
                                        <span className="text-gray-800">Certificate {index + 1}</span>
                                        <a
                                            href={link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-400 hover:text-gray-600"
                                        >
                                            {Icons.view}
                                        </a>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-gray-400 mt-2">No Certifications</div>
                        )}
                    </div>

                </div>
                <div>
                    <h2 className='h5'>{Icons.book} Certifications</h2>
                    <div>

                        {identityProof.length > 0 ? (
                            <div className=" mt-2 grid grid-cols-4 gap-3">
                                {identityProof?.map((link: string, index: number) => (
                                    <div
                                        className="flex justify-between items-center p-3 hover:bg-gray-50 rounded"
                                    >
                                        <span className="text-gray-800">Identity Proof {index + 1}</span>
                                        <a
                                            href={link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-400 hover:text-gray-600"
                                        >
                                            {Icons.view}
                                        </a>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-gray-400 mt-2">No Identity Proof</div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Documents;
