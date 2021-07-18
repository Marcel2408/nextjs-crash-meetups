import { MongoClient, ObjectId } from 'mongodb';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { MeetupDetail } from '../../components/meetups/MeetupDetail';

const MeetupDetailPage = (props) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Meetup Details</title>
        <meta
          name="description"
          content="See the details of your meetup"
        ></meta>
      </Head>
      {props.meetup && <MeetupDetail meetup={props.meetup} />};
    </>
  );
};

export default MeetupDetailPage;

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.82p6j.mongodb.net/meetups?retryWrites=true&w=majority`
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    // if fallback is false, when a post is added to db and user clicks to see details it won't work as Next doesn't create one on the fly
    fallback: true,
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.82p6j.mongodb.net/meetups?retryWrites=true&w=majority`
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetupSelected = await meetupsCollection.findOne({
    _id: ObjectId(context.params.meetupId),
  });
  client.close();

  const meetup = {
    id: meetupSelected._id.toString(),
    title: meetupSelected.title,
    image: meetupSelected.image,
    address: meetupSelected.address,
    description: meetupSelected.description,
  };
  return {
    props: {
      meetup,
    },
  };
}
