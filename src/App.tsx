import { useEffect, useState } from 'react'
import {
  Page,
  Button,
  Table,
  Box,
  Loader,
  type TableColumn
} from '@wix/design-system';

type Subscriber = {
  email: string;
  subscriptionStatus: string;
  deliverabilityStatus: string;
  createdDate: string;
  updatedDate: string;
};

const getInstanceId = () => {
  const instance = new URLSearchParams(window.location.search).get('instance');

  if (instance) {
    const instancePayload = instance?.split('.')[1] as string;
    const parsedInstance = JSON.parse(atob(instancePayload));
    const instanceId = parsedInstance.instanceId as string;

    return instanceId;
  };
};

function App() {
  const instanceId = getInstanceId();
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const columns: TableColumn<Subscriber>[] = [
    {
      title: 'Email',
      width: '40%',
      render: (row) => row.email,
    },
    {
      title: 'Status',
      width: '20%',
      render: (row) => row.subscriptionStatus,
    },
    {
      title: 'Validity',
      width: '20%',
      render: (row) => row.deliverabilityStatus,
    },
    {
      title: 'Subscribe Date',
      width: '20%',
      render: (row) => new Date(row.createdDate).toLocaleDateString(),
    },
  ];

  useEffect(() => {
    const getSubscribers = async () => {
      const subscribersResponse = await fetch(`https://galisrael8914.wixstudio.io/v1api/_functions/subscribers?instanceId=${instanceId}`).then(res => res.json());

      if (subscribersResponse?.subscriptions?.length) {
        setSubscribers(subscribersResponse.subscriptions);
      };

      setLoading(false);
    };

    getSubscribers();
  }, []);

  return (
    <Page>
      <Page.Header
        title="Subscribers"
        actionsBar={
          <Button>Update</Button>
        }
      />
      <Page.Content>
        <Table
          data={subscribers}
          columns={columns}
        >
          {loading ? (
            <Box align='center'>
              <Loader />
            </Box>
          ) : (
            <Table.Content />
          )}
          {!loading && !subscribers.length && (
            <Table.EmptyState
              title="No Subscribers"
            />
          )}
        </Table>
      </Page.Content>
    </Page>
  )
}

export default App
