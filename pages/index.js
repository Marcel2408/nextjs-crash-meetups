import { MongoClient } from 'mongodb';
import Head from 'next/head';
import MeetupList from '../components/meetups/MeetupList';

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>Meetups NextJs Page</title>
        <meta
          name="description"
          content="The NextJS crash course filled with meetups"
        ></meta>
      </Head>
      <h1>Welcome to Meetups</h1>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

export default HomePage;

export async function getStaticProps() {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.82p6j.mongodb.net/meetups?retryWrites=true&w=majority`
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        description: meetup.description,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
  };
}

// todo create a getStaticProps fn to load the meetups data and hydrate the fn component
