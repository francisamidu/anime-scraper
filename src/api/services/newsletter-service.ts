import { Request, Response } from "express";
import {
  addContact,
  addContactToList,
  deleteContactFromList,
  getContactByEmail,
  getListID,
  sendgridClient,
  sendgridMail,
} from "../../helpers";
const ck = require("ckey");

const BASE_URL = "https://anime-scraper.netlify.app";
class NewsletterService {
  static async get(req: Request, res: Response) {
    res.status(200).json({
      message: "Welcome to anime scraper",
    });
  }
  static async confirm(req: Request, res: Response) {
    try {
      const contact = await getContactByEmail(String(req.body.email));
      if (contact == null) throw `Contact not found.`;
      if (contact.custom_fields.conf_num == req.body.conf_num) {
        const listID = await getListID("Newsletter Subscribers");
        await addContactToList(String(req.body.email), listID);
      } else {
        throw "Confirmation number does not match";
      }
      return res.status(200).json({ message: "Confirmed" });
    } catch (error) {
      console.error(error);
      return res.status(401).json({
        message: "Subscription was unsuccessful. Please try again",
      });
    }
  }
  static async subscribe(req: Request, res: Response) {
    try {
      const confirmationURL = `${BASE_URL}/confirm`;
      const msg = {
        to: req.body.email,
        from: ck.TO_EMAIL, // Change to your verified sender
        subject: "Confirm your subscription to our newsletter",
        html: `Hello ${req.body.firstName},<br>Thank you for subscribing to our newsletter. <a href="${confirmationURL}">Please complete and confirm your subscription</a>`,
      };
      const addContactResponse = await addContact(
        req.body.firstName,
        req.body.email
      );
      console.log(addContactResponse);
      const sendEmailResponse = await sendgridMail.send(msg);
      console.log(sendEmailResponse);
      return res.status(200).json({
        message: "We have sent you an email to confirm your subscription",
      });
    } catch (error) {
      console.error(error);
      return res.status(401).json({
        message: "Email could not be subscribed. please try again.",
      });
    }
  }
  static async unsubscribe(req: Request, res: Response) {
    try {
      const contact = await getContactByEmail(String(req.body.email));
      if (contact == null) throw `Contact not found.`;
      if (contact.custom_fields.conf_num == req.body.conf_num) {
        const listID = await getListID("Newsletter Subscribers");
        await deleteContactFromList(listID, contact);
        const msg = {
          to: String(req.body.email),
          from: ck.TO_EMAIL, // Change to your verified sender
          subject: "Subscription Notification",
          html: `You have been successfully unsubscribed. If this was a mistake re-subscribe <a href="${BASE_URL}/subscribe">here</a>.`,
        };
        await sendgridMail.send(msg);
      } else
        throw "Confirmation number does not match or contact is not subscribed";
    } catch (error) {
      console.error(error);
      return res.status(401).json({
        message: "Email could not be unsubscribed. please try again.",
      });
    }
  }
}
export default NewsletterService;
