interface MessageModalProps {
    isOpen: boolean;
    onClose: () => void;
    message: string;
}

export function MessageModal({ isOpen, onClose, message }: MessageModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="bg-white rounded-lg p-6 shadow-xl max-w-md w-full mx-4 relative z-10">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="mt-2">
                    <p className="text-gray-800 text-lg">{message}</p>
                </div>
            </div>
        </div>
    );
} 