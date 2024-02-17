import { Button, Group, Paper, Title, Text } from "@mantine/core";
import classes from "../../css_modules/SignInPage.module.css";

interface Step0Props {
  setAccountType: any;
  setCurrentStep: any;
}

export const Step0: React.FC<Step0Props> = ({
  setAccountType,
  setCurrentStep,
}) => {
  return (
    <>
      <Title ta="center" className={classes.title} order={3}>
        Choose Account Type
      </Title>

      <Group grow justify="center">
        <Paper withBorder shadow="none" p={10} mt={15} radius="md" ta="center">
          <Title className={classes.title} order={4}>
            Professional
          </Title>

          <Text mt="sm">For those looking to get hired.</Text>

          <Button
            mt="sm"
            onClick={() => {
              setAccountType("Professional");
              setCurrentStep(1);
            }}
          >
            Sign up as Professional
          </Button>
        </Paper>

        <Paper withBorder shadow="none" p={10} mt={15} radius="md" ta="center">
          <Title className={classes.title} order={4}>
            Employer
          </Title>

          <Text mt="sm">For those looking to hire others.</Text>

          <Button
            mt="sm"
            onClick={() => {
              setAccountType("Employer");
              setCurrentStep(1);
            }}
          >
            Sign up as Employer
          </Button>
        </Paper>
      </Group>
    </>
  );
};
