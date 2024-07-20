import Client from '../config/dbConn.js';
import responseCode from '../config/responseCode.js';

export const fetchNotifications = async (req, res) => {
    try {
        const { username } = req.params;

        // Check if user exists
        const result = await Client.query('SELECT * FROM users WHERE username = $1', [username]);

        //  If user does not exist
        if (result.rows.length === 0) {
            return res.status(responseCode.badRequest).json({ msg: "User does not exist" })
        }

        // If user exists
        const fetchUserNotifications = await Client.query('SELECT notifications FROM notifications WHERE username = $1', [username]);

        const { notifications } = fetchUserNotifications.rows[0];

        res.json({notifications})
    }
    catch (err) {
        console.log("@fetchNotification : \n" + err);
        return res.sendStatus(responseCode.internalServerError)
    }
}

export class Notifications {
    constructor(username) {
      this.username = username;
      this.size = 5;
      this.notifications = [];
    }
  
    async fetch() {
      try {
        const result = await Client.query('SELECT * FROM notifications WHERE username = $1', [this.username]);
  
        if (result.rows.length === 0) {
          await Client.query('INSERT INTO notifications (username, notifications) VALUES ($1, $2::jsonb[])', [this.username, []]);
        } else {
          this.notifications = result.rows[0]["notifications"];
        }
      } catch (err) {
        console.log("@fetch : \n" + err);
      }
    }
  
    pop() {
      this.notifications.pop();
    }
  
    async push(message) {
      try {
        await this.fetch();
  
        if (this.notifications.length >= this.size) {
          this.pop();
        }
  
        const timestamp = new Date().toLocaleTimeString();
        this.notifications.unshift({ info: message, createdAt: timestamp });
  
        await Client.query('UPDATE notifications SET notifications = $1 WHERE username = $2', [this.notifications, this.username]);
      } catch (err) {
        console.log("@push : \n" + err);
      }
    }
  }