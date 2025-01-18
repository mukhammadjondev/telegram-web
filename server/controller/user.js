const messageModel = require('../models/message');
const userModel = require('../models/user');
const BaseError = require('../errors/base');
const { CONST } = require('../lib/constants');
const mailService = require('../service/mail');

class UserController {
  // [GET]
  async getContacts(req, res, next) {
    try {
      const userId = '6778f35b60320b59658da531';

      const contacts = await userModel.findById(userId).populate('contacts');
      const allContacts = contacts.contacts.map(contact => contact.toObject());

      for (const contact of allContacts) {
        const lastMessage = await messageModel
          .findOne({
            $or: [
              { sender: userId, receiver: contact._id },
              { sender: contact._id, receiver: userId },
            ],
          })
          .populate({ path: 'sender' })
          .populate({ path: 'receiver' })
          .sort({ created_at: -1 });

        contact.lastMessage = lastMessage;
      }

      return res.status(200).json({ contacts: allContacts });
    } catch (error) {
      next(error);
    }
  }

  async getMessages(req, res, next) {
    try {
      const user = '6778f35b60320b59658da531';
      const { contactId } = req.params;

      const messages = await messageModel
        .find({
          $or: [
            { sender: user, receiver: contactId },
            { sender: contactId, receiver: user },
          ],
        })
        .populate({ path: 'sender', select: 'email' })
        .populate({ path: 'receiver', select: 'email' });
      await messageModel.updateMany(
        { sender: contactId, receiver: user, status: CONST.SENT },
        { status: CONST.READ }
      );

      res.status(200).json({ messages });
    } catch (error) {
      next(error);
    }
  }

  // [POST]
  async sendOtp(req, res, next) {
    try {
      const { email } = req.body;
      const existingUser = await userModel.findOne({ email });
      if (existingUser)
        throw BaseError.BadRequest('User with this email already exist');

      await mailService.sendOtp(email);
      res.status(200).json({ message: 'Otp sent successfully' });
    } catch (error) {
      next(error);
    }
  }

  async createMessage(req, res, next) {
    try {
      const newMessage = await messageModel.create(req.body);
      const currentMessage = await messageModel
        .findById(newMessage._id)
        .populate({ path: 'sender', select: 'email' })
        .populate({ path: 'receiver', select: 'email' });

      res.status(201).json({ newMessage: currentMessage });
    } catch (error) {
      next(error);
    }
  }

  async messageRead(req, res, next) {
    try {
      const { messages } = req.body;
      const allMessages = [];

      for (const message of messages) {
        const updateMessage = await messageModel.findByIdAndUpdate(
          message._id,
          { status: CONST.READ },
          { new: true }
        );
        allMessages.push(updateMessage);

        res.status(200).json({ messages: allMessages });
      }
    } catch (error) {
      next(error);
    }
  }

  async createContact(req, res, next) {
    try {
      const { email } = req.body;
      const userId = '6778f35b60320b59658da531';
      const user = await userModel.findById(userId);
      const contact = await userModel.findOne({ email });
      if (!contact)
        throw BaseError.BadRequest('User with this email does not exist');

      if (user.email === contact.email)
        throw BaseError.BadRequest('You cannot add yourself as a contact');

      const existingUser = await userModel.findOne({
        _id: user._id,
        contacts: contact._id,
      });
      if (existingUser)
        throw BaseError.BadRequest(
          'Contact already exists in your contact list'
        );

      await userModel.findByIdAndUpdate(userId, {
        $push: { contacts: contact._id },
      });
      const addedContact = await userModel.findByIdAndUpdate(
        contact._id,
        { $push: { contacts: userId } },
        { new: true }
      );
      return res.status(201).json({
        message: 'Contact added successfully',
        contact: addedContact,
      });
    } catch (error) {
      next(error);
    }
  }

  async createReaction(req, res, next) {
    try {
      const { messageId, reaction } = req.body;
      const updateMessage = await messageModel.findByIdAndUpdate(
        messageId,
        { reaction },
        { new: true }
      );
      res.status(200).json({ updateMessage });
    } catch (error) {
      next(error);
    }
  }

  // [PUT]
  async updateProfile(req, res, next) {
    try {
      const { userId, ...payload } = req.body;
      await userModel.findByIdAndUpdate(userId, payload);
      res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
      next(error);
    }
  }

  async updateEmail(req, res, next) {
    try {
      const { email, otp } = req.body;
      const result = await mailService.verifyOtp(email, otp);
      if (result) {
        const userId = '6778f35b60320b59658da531';
        const user = await userModel.findByIdAndUpdate(
          userId,
          { email },
          { new: true }
        );
        res.status(200).json({ user });
      }
    } catch (error) {
      next(error);
    }
  }

  async updateMessage(req, res, next) {
    try {
      const { messageId } = req.params;
      const { text } = req.body;
      const updateMessage = await messageModel.findByIdAndUpdate(
        messageId,
        { text },
        { new: true }
      );
      res.status(200).json({ updateMessage });
    } catch (error) {
      next(error);
    }
  }

  // [DELETE]
  async deleteUser(req, res, next) {
    try {
      const userId = '6778f35b60320b59658da531';
      await userModel.findByIdAndDelete(userId);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      next(error);
    }
  }

  async deleteMessage(req, res, next) {
    try {
      const { messageId } = req.params;
      await messageModel.findByIdAndDelete(messageId);
      res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
