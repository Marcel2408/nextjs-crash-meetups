import { MongoClient } from 'mongodb';
// api/new-meetup

async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const meetupData = req.body;
      // returns a promise
      const client = await MongoClient.connect(
        'mongodb+srv://marcel2408:XpNUO3ogsONfkHAk@cluster0.82p6j.mongodb.net/meetups?retryWrites=true&w=majority'
      );

      const db = client.db();
      const meetupsCollection = db.collection('meetups');

      const result = await meetupsCollection.insertOne(meetupData);
      client.close();
      res.status(201).json({ message: 'Meetup saved!' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default handler;
