import Head from 'next/head';
import { useRouter } from 'next/router';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

const NewMeetupPage = () => {
  const router = useRouter();

  const saveNewMeetupToDB = async (newMeetup) => {
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(newMeetup),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    router.back();
  };
  return (
    <>
      <Head>
        <title>Create a new meetup</title>
        <meta name="description" content="Add new meetups"></meta>
      </Head>
      <h1>New Meetup</h1>
      <NewMeetupForm onAddMeetup={saveNewMeetupToDB} />
    </>
  );
};

export default NewMeetupPage;
