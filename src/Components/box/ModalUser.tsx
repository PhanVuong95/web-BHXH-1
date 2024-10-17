interface ModalUserProps {
  onLogout: () => void; 
}

const ModalUser: React.FC<ModalUserProps> = ({ onLogout }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold">Thông Tin Tài Khoản</h2>
        <div className="mt-4 flex justify-between">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={onLogout}
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalUser;
