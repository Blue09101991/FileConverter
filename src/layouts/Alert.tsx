type AlertProps = {
    message: string;
    onClose: () => void;
}
const Alert: React.FunctionComponent<AlertProps> = (props) => {
    const { message, onClose } = props;
    return (
        <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center z-50">
            <div className="fixed top-0 left-0 w-full h-screen bg-black opacity-50"></div>
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full transform transition-transform duration-300 scale-95 translate-y-4 opacity-0 animate-slideUp">
                <h2 className="text-2xl font-bold mb-4">Alert</h2>
                <p className="mb-4">{message}</p>
                <button onClick={onClose} className="btn btn-primary mt-4">
                    Close
                </button>
            </div>
        </div>
    );
};
export default Alert;