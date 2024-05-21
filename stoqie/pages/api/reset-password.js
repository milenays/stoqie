import dbConnect from '../../lib/mongodb';
import User from '../../models/User';
import { sendPasswordResetEmail } from '../../lib/mailer';

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'POST':
      try {
        const { email } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(400).json({ message: 'No user found with this email' });
        }

        // Şifre sıfırlama işlemi için gereken adımları burada yapın, örneğin bir token oluşturup e-posta ile gönderin.
        await sendPasswordResetEmail(user.email, user._id);

        res.status(200).json({ message: 'Password reset link sent' });
      } catch (error) {
        res.status(400).json({ message: 'Error sending password reset email' });
      }
      break;
    default:
      res.status(400).json({ message: 'Method not allowed' });
  }
}