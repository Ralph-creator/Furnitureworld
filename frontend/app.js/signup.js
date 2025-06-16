import {useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';
const nodemailer = require('nodemailer');



const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'adesanyaraph@gmail.com',
    pass: 'pass: process.env.EMAIL_PASSWORD',
  },
});



const Signup = () => {
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: '',
    });
    const navigate = useNavigate();
    const handleChange = e =>
      setFormData({ ...formData, [e.target.name]: e.target.value });
  
    const handleSubmit = async e => {
      e.preventDefault();
  
      const loadingToast = toast.loading('Signing you up...');
  
      try {
        const res = await fetch('http://localhost:5500/backendapp/api/signUp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        const data = await res.json();
  
        if (data.success) {
          toast.success(data.message || 'Signup successful!', { id: loadingToast });
          navigate('/signin'); // Redirect to the sign-in page after successful signup
        } else {
          toast.error(data.message || 'Signup failed.', { id: loadingToast });
        }
      } catch (error) {
        toast.error('An error occurred. Please try again.', { id: loadingToast });
      }
    };
  
    return (
      <div className="signup-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            // required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            // required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            // required
          />
          <button type="submit">Register</button>
        </form>
      </div>
    );
  };

document.getElementById('signup-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const form = e.target;
    const username = form.username.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
  
    const msg = document.getElementById('signup-message');
  
    // Frontend email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      msg.textContent = 'Please enter a valid email address.';
      return;
    }
  
    try {
      const res = await fetch('http://localhost:5500/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        msg.textContent = 'Signup successful! Redirecting to login...';
        setTimeout(() => window.location.href = 'login.html', 2000);
      } else {
        msg.textContent = data.error || 'Signup failed!';
      }
    } catch (err) {
      console.error(err);
      msg.textContent = 'An error occurred. Please try again.';
    }
  });

  export default Signup;
  