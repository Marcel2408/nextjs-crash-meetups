import { useRouter } from 'next/router';
import React from 'react';
import classes from './MeetupDetail.module.css';
export const MeetupDetail = (props) => {
  const router = useRouter();
  const { image, address, title, description } = props.meetup;

  return (
    <section className={classes.section}>
      <img className={classes.image} src={image} alt={title} />
      <h2>{title}</h2>
      <address>{address}</address>
      <p>{description}</p>
      <div className={classes.actions}>
        <button
          onClick={() => {
            router.back();
          }}
        >
          Back to List
        </button>
      </div>
    </section>
  );
};
