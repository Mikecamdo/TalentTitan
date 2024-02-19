import {
  Avatar,
  Text,
  Group,
  Card,
  Container,
  Button,
  Table,
  Grid,
} from "@mantine/core";
import {
  IconPhoneCall,
  IconAt,
  IconUser,
  IconHome,
  IconCertificate,
  IconSchool,
  IconCalendar,
} from "@tabler/icons-react";
import classes from "../css_modules/ProfilePage.module.css";
import Qualification from "../types/Qualification";

export const ProfilePage = () => {
  const qualifications: Qualification[] = [
    { category: "Languages", keywords: "C, C++, C#, Java, JavaScript" },
    { category: "Frameworks", keywords: "React, Angular, Vue, Node.js, .NET" },
    { category: "Databases", keywords: "PostgreSQL, SQL Server" },
  ];

  const rows = qualifications.map((qualification: Qualification) => (
    <Table.Tr>
      <Table.Td>{qualification.category}</Table.Td>
      <Table.Td>{qualification.keywords}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Container size="md">
        <Card shadow="md" padding="lg" radius="md" withBorder>
          <Group justify="center">
            <div>
              <Avatar
                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
                size={125}
                radius="md"
              />

              <Text
                ta="center"
                fz="md"
                fw={500}
                mt={5}
                className={classes.name}
              >
                BSmith7
              </Text>
            </div>

            <div>
              <Text fz="lg" fw={500} className={classes.name}>
                Personal Info
              </Text>

              <Group wrap="nowrap" gap={10} mt={3}>
                <IconUser stroke={1.5} size="1rem" className={classes.icon} />
                <Text fz="sm" c="dimmed">
                  Bob Smith
                </Text>
              </Group>

              <Group wrap="nowrap" gap={10} mt={3}>
                <IconAt stroke={1.5} size="1rem" className={classes.icon} />
                <Text fz="sm" c="dimmed">
                  robert_smith@gmail.com
                </Text>
              </Group>

              <Group wrap="nowrap" gap={10} mt={5}>
                <IconPhoneCall
                  stroke={1.5}
                  size="1rem"
                  className={classes.icon}
                />
                <Text fz="sm" c="dimmed">
                  (123) 456-7890
                </Text>
              </Group>
            </div>

            <div>
              <Text fz="lg" fw={500} className={classes.name}>
                Address
              </Text>

              <Group wrap="nowrap" gap={10} mt={3}>
                <IconHome stroke={1.5} size="1rem" className={classes.icon} />
                <Text fz="sm" c="dimmed">
                  6425 Boaz Lane
                </Text>
              </Group>

              <Group wrap="nowrap" gap={10} mt={3}>
                <IconHome stroke={1.5} size="1rem" className={classes.hidden} />
                <Text fz="sm" c="dimmed">
                  Dallas, Texas
                </Text>
              </Group>

              <Group wrap="nowrap" gap={10} mt={5}>
                <IconHome stroke={1.5} size="1rem" className={classes.hidden} />
                <Text fz="sm" c="dimmed">
                  75205
                </Text>
              </Group>
            </div>

            <div>
              <Text fz="lg" fw={500} className={classes.name}>
                Degree Info
              </Text>

              <Group wrap="nowrap" gap={10} mt={3}>
                <IconSchool stroke={1.5} size="1rem" className={classes.icon} />
                <Text fz="sm" c="dimmed">
                  Southern Methodist University
                </Text>
              </Group>

              <Group wrap="nowrap" gap={10} mt={3}>
                <IconCertificate
                  stroke={1.5}
                  size="1rem"
                  className={classes.icon}
                />
                <Text fz="sm" c="dimmed">
                  B.S. Computer Science
                </Text>
              </Group>

              <Group wrap="nowrap" gap={10} mt={5}>
                <IconCalendar
                  stroke={1.5}
                  size="1rem"
                  className={classes.icon}
                />
                <Text fz="sm" c="dimmed">
                  May 2025
                </Text>
              </Group>
            </div>
          </Group>

          <Group justify="center" mt="md">
            <Button>Request Account Deletion</Button>
            <Button>Payment Options</Button>
            <Button>Change Password</Button>
            <Button>Edit Profile</Button>
          </Group>

          <Card.Section>
            <Grid px="xs" pb="lg" pt="xs">
              <Grid.Col span={6}>
                <Text fz="lg" fw={500} className={classes.name} ta="center">
                  Qualifications
                </Text>
                <Table highlightOnHover withTableBorder>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Category</Table.Th>
                      <Table.Th>Keywords/Key phrases</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>{rows}</Table.Tbody>
                </Table>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text fz="lg" fw={500} className={classes.name} ta="center">
                  Transaction History
                </Text>
                <Text fz="sm">February 11, 2024: Received $50 from Walmart</Text>
                <Text fz="sm" mt="xs">February 1, 2024: Paid $10 to Talent Titan (subscription fee)</Text>
              </Grid.Col>
            </Grid>
          </Card.Section>
        </Card>
      </Container>
    </>
  );
};