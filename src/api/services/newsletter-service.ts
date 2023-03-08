import { Request, Response } from "express";
import {
  addContact,
  addContactToList,
  deleteContactFromList,
  getContactByEmail,
  getListID,
  sendgridMail,
} from "../../helpers";
const ck = require("ckey");

class NewsletterService {
  static async subscribe(req: Request, res: Response) {
    const confirmationURL = "https://anime-scraper/confirm";
    const msg = {
      to: req.body.email,
      from: ck.TO_EMAIL, // Change to your verified sender
      subject: `Confirm your subscription to our newsletter`,
      html: `Hello ${req.body.firstname},<br>Thank you for subscribing to our newsletter. Please complete and confirm your subscription by <a href="${confirmationURL}`,
    };
    await addContact(req.body.firstname, req.body.lastname, req.body.email);
    await sendgridMail.send(msg);
    return res.status(200);
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
      return res.status(200);
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
        res.render("message", {
          message:
            'You have been successfully unsubscribed. If this was a mistake re-subscribe <a href="https://anime-scraper/signup">here</a>.',
        });
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
