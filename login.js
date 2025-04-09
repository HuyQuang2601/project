document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.button'); // Giả sử nút "Đăng nhập" có class là "button"

    loginForm.addEventListener('click', function(e) {
        e.preventDefault(); // Ngăn chặn sự kiện load lại trang nếu nút là submit

        // Lấy giá trị từ form đăng nhập
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        // Kiểm tra thông tin đăng nhập trong localStorage
        const userKey = 'user_' + email;
        const userData = JSON.parse(localStorage.getItem(userKey));

        if (userData && userData.email === email && userData.password === password) {
            // Đăng nhập thành công, chuyển hướng đến dashboard
            alert('Đăng nhập thành công!');
            window.location.href = '/pages/dashboard.html'; // Chuyển hướng đến trang dashboard
        }
    });
});

// Hàm kiểm tra định dạng email (nếu cần)
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Ngăn submit mặc định
  
    // Lấy các input
    const email = document.getElementById('email');
    const password = document.getElementById('password');
  
    // Lấy các nhóm form và thông báo lỗi
    const groups = document.querySelectorAll('.form-group');
    let isValid = true;
  
    // Xóa trạng thái lỗi trước đó
    groups.forEach(group => {
      group.classList.remove('invalid');
      const errorMessage = group.querySelector('.error-message');
      errorMessage.textContent = '';
    });
  
    // Kiểm tra email
    if (!email.value.trim()) {
      email.closest('.form-group').classList.add('invalid');
      email.closest('.form-group').querySelector('.error-message').textContent = 'Vui lòng nhập email';
      isValid = false;
    } else if (!isValidEmail(email.value)) {
      email.closest('.form-group').classList.add('invalid');
      email.closest('.form-group').querySelector('.error-message').textContent = 'Vui lòng nhập email hợp lệ';
      isValid = false;
    }
  
    // Kiểm tra mật khẩu
    if (!password.value.trim()) {
      password.closest('.form-group').classList.add('invalid');
      password.closest('.form-group').querySelector('.error-message').textContent = 'Vui lòng nhập mật khẩu';
      isValid = false;
    }
  
    // Nếu form hợp lệ, kiểm tra đăng nhập
    if (isValid) {
      // Lấy danh sách người dùng từ localStorage
      let users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.email === email.value && u.password === password.value);
  
      if (user) {
        alert('Đăng nhập thành công!');
        this.submit(); // Submit form nếu hợp lệ (có thể điều hướng trang)
      } else {
        email.closest('.form-group').classList.add('invalid');
        email.closest('.form-group').querySelector('.error-message').textContent = 'Email hoặc mật khẩu không đúng';
        password.closest('.form-group').classList.add('invalid');
        password.closest('.form-group').querySelector('.error-message').textContent = 'Email hoặc mật khẩu không đúng';
      }
    }
  });
  
  // Hàm kiểm tra định dạng email
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Gắn sự kiện cho nút Đăng nhập (vì nút ngoài form)
  document.querySelector('.button').addEventListener('click', function() {
    document.getElementById('loginForm').dispatchEvent(new Event('submit'));
  });