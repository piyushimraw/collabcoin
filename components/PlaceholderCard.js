import React from 'react';
import { Card, Placeholder } from 'semantic-ui-react';
export default function PlaceholderCard({
  loading,
  cardHeader,
  cardMeta,
  cardDesc,
  address,
  onClick = () => {}
}) {
  return (
    <Card raised link onClick={onClick}>
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
            {typeof cardDesc !== 'undefined' && (
              <Card.Description>{cardDesc}</Card.Description>
            )}
          </>
        )}
      </Card.Content>
    </Card>
  );
}
