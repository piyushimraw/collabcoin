import React from 'react';
import { Card, Button } from 'semantic-ui-react';
import Link from 'next/link';

export default function CampignCard({ campigns = [] }) {
  const items = campigns.map((campign) => ({
    header: campign,
    description: (
      <Link href={`/campign/show?address=${campign}`}>View Campign</Link>
    ),
  }));
  return <Card.Group items={items} itemsPerRow={1} />;
}
