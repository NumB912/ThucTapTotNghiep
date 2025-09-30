export default function Footer() {
  return (
    <footer className="bg-purple-500 text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Grid chia 3 cột */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo + Mô tả */}
          <div>
            <h2 className="text-2xl font-bold">MyBrand</h2>
            <p className="mt-3 text-sm">
              Nơi chia sẻ những sản phẩm & dịch vụ chất lượng. Kết nối và lan tỏa giá trị.
            </p>
          </div>

          {/* Liên kết nhanh */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Liên kết</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-600 transition">Trang chủ</a></li>
              <li><a href="#" className="hover:text-blue-600 transition">Giới thiệu</a></li>
              <li><a href="#" className="hover:text-blue-600 transition">Dịch vụ</a></li>
              <li><a href="#" className="hover:text-blue-600 transition">Liên hệ</a></li>
            </ul>
          </div>

          {/* Mạng xã hội */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Kết nối</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-600 transition">Facebook</a>
              <a href="#" className="hover:text-pink-600 transition">Instagram</a>
              <a href="#" className="hover:text-sky-600 transition">Twitter</a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 mt-8 pt-6 text-center text-sm text-gray-600">
          © 2025 MyBrand. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
