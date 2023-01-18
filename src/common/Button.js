
const Button = ({ label, onClick }) => {
	return (
		<div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
			<button onClick={onClick}>{label}</button>
		</div>
	);
};

export default Button;
