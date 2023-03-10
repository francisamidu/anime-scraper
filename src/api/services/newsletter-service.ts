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

class NewsletterService {
  static async subscribe(req: Request, res: Response) {
    const confirmationURL = "https://anime-scraper/confirm";
    const msg = {
      to: req.body.email,
      from: ck.TO_EMAIL, // Change to your verified sender
      subject: "Confirm your subscription to our newsletter",
      html: `Hello ${req.body.name},<br>Thank you for subscribing to our newsletter. Please complete and confirm your subscription by <a href="${confirmationURL}</a>`,
    };
    await addContact(req.body.name, req.body.email);
    await sendgridMail.send(msg);
    return res.status(200).json({ result: "Subscribed" });
  }
  static async confirm(req: Request, res: Response) {
    try {
      const contact = await getContactByEmail(String(req.query.email));
      if (contact == null) throw `Contact not found.`;
      if (contact.custom_fields.conf_num == req.query.conf_num) {
        const listID = await getListID("Newsletter Subscribers");
        await addContactToList(String(req.query.email), listID);
      } else {
        throw "Confirmation number does not match";
      }
      return res.status(200).json({ result: "Confirmed" });
    } catch (error) {
      console.error(error);
      return res.status(401).json({
        message: "Subscription was unsuccessful. Please try again",
      });
    }
  }
  static async unsubscribe(req: Request, res: Response) {
    try {
      const contact = await getContactByEmail(String(req.query.email));
      if (contact == null) throw `Contact not found.`;
      if (contact.custom_fields.conf_num == req.query.conf_num) {
        const listID = await getListID("Newsletter Subscribers");
        await deleteContactFromList(listID, contact);
        const msg = {
          to: String(req.query.email),
          from: ck.TO_EMAIL, // Change to your verified sender
          subject: "Subscription Notification",
          html: `You have been successfully unsubscribed. If this was a mistake re-subscribe <a href="https://anime-scraper/subscribe">here</a>.`,
        };
        await sendgridMail.send(msg);
      } else
        throw "Confirmation number does not match or contact is not subscribed";
    } catch (error) {
      console.error(error);
      return res.status(401).json({
        result: "Email could not be unsubscribed. please try again.",
      });
    }
  }
}
export default NewsletterService;
