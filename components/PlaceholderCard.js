import React from 'react';
import { Card, Placeholder } from 'semantic-ui-react';
export default function PlaceholderCard({
  loading,
  cardHeader,
  cardMeta,
  cardDesc
}) {
  return (
    <Card raised>
      <Card.Content>
        {loading ? (
          <>
            <Placeholder fluid>
              <Placeholder.Header as="h2" />
              <Placeholder.Line />
            </Placeholder>
          </>
        ) : (
          <>
            <Card.Header>{cardHeader}</Card.Header>
            {cardMeta && <Card.Meta>{cardMeta}</Card.Meta>}
            {cardDesc && <Card.Description>{cardDesc} </Card.Description>}
          </>
        )}
      </Card.Content>
    </Card>
  );
}
