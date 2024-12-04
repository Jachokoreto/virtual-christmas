import { useState } from 'react'
import { DecorationChoice } from '../types'

const DECORATION_CHOICES: DecorationChoice[] = [
    { type: 'bauble', label: 'Bauble', color: '#ff0000' },
    { type: 'star', label: 'Star', color: '#ffd700' },
    { type: 'lights', label: 'Lights', color: '#00ff00' }
]

interface WishModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: (type: DecorationChoice['type'], message: string, color: string) => void
}

export function WishModal({ isOpen, onClose, onConfirm }: WishModalProps) {
    const [step, setStep] = useState(1)
    const [selectedType, setSelectedType] = useState<DecorationChoice['type'] | null>(null)
    const [message, setMessage] = useState('')
    const [color, setColor] = useState('#ff0000')

    const handleConfirm = () => {
        if (!selectedType) return
        onConfirm(selectedType, message, color)
        resetForm()
    }

    const resetForm = () => {
        setStep(1)
        setSelectedType(null)
        setMessage('')
        setColor('#ff0000')
    }

    const handleClose = () => {
        resetForm()
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg w-96">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl text-white">
                        {step === 1 ? 'Choose Decoration' : 'Add Your Message'}
                    </h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-white"
                    >
                        ✕
                    </button>
                </div>

                {step === 1 ? (
                    <div className="space-y-4">
                        {DECORATION_CHOICES.map((choice) => (
                            <button
                                key={choice.type}
                                onClick={() => {
                                    setSelectedType(choice.type)
                                    setColor(choice.color)
                                    setStep(2)
                                }}
                                className={`w-full p-4 rounded ${selectedType === choice.type
                                        ? 'bg-blue-600'
                                        : 'bg-gray-700'
                                    } text-white hover:bg-blue-500 transition-colors`}
                            >
                                {choice.label}
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div>
                            <label className="text-white block mb-2">
                                Your Message (optional)
                            </label>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full p-2 rounded bg-gray-700 text-white"
                                rows={4}
                                placeholder="Write your wish or message..."
                            />
                        </div>
                        <div>
                            <label className="text-white block mb-2">
                                Color
                            </label>
                            <input
                                type="color"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                                className="w-full h-10 rounded"
                            />
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setStep(1)}
                                className="flex-1 p-2 bg-gray-600 text-white rounded hover:bg-gray-500"
                            >
                                Back
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="flex-1 p-2 bg-blue-600 text-white rounded hover:bg-blue-500"
                            >
                                Place on Tree
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
} 