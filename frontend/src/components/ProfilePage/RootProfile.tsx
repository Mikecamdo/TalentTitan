import {
  Avatar,
  Text,
  Group,
  Card,
  Container,
  Grid,
} from "@mantine/core";
import { IconPhoneCall, IconAt, IconUser } from "@tabler/icons-react";
import classes from "../../css_modules/ProfilePage.module.css";
import { useState } from "react";
import { ProfileProps } from "../../pages/ProfilePage";
import Staff from "../../types/Staff";

export const RootProfile: React.FC<ProfileProps> = ({ currentlyViewing }) => {
  const [root] = useState<Staff>({
    firstName: "root",
    lastName: "root",
    username: "root",
    phoneNumber: "null",
    email: "null",
  });

  if (!root) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Container size="md">
        <Card shadow="md" padding="lg" radius="md" withBorder>
          <Grid>
            <Grid.Col span={4}>
              <Avatar size={125} radius="md" mx="auto" />

              <Text
                ta="center"
                fz="md"
                fw={500}
                mt={5}
                className={classes.name}
              >
                {root.username}
              </Text>
            </Grid.Col>

            <Grid.Col span={4}>
              <Text fz="lg" fw={500} className={classes.name}>
                Personal Info
              </Text>

              <Group wrap="nowrap" gap={10} mt={3}>
                <IconUser stroke={1.5} size="1rem" className={classes.icon} />

                <Text fz="sm" c="dimmed">
                  {root.firstName} {root.lastName}
                </Text>
              </Group>

              <Group wrap="nowrap" gap={10} mt={3}>
                <IconAt stroke={1.5} size="1rem" className={classes.icon} />

                <Text fz="sm" c="dimmed">
                  {root.email}
                </Text>
              </Group>

              <Group wrap="nowrap" gap={10} mt={5}>
                <IconPhoneCall
                  stroke={1.5}
                  size="1rem"
                  className={classes.icon}
                />

                <Text fz="sm" c="dimmed">
                  {root.phoneNumber}
                </Text>
              </Group>
            </Grid.Col>
          </Grid>
        </Card>
      </Container>
    </>
  );
};
