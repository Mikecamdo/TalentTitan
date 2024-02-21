import { Title, Text, Button, Container, Group } from "@mantine/core";
import classes from "../css_modules/_404Page.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const _404Page = () => {
  const navigate = useNavigate();
  const messages = [
    {
      title: "You have found a secret place.",
      text: "Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has been moved to another URL.",
    },
    {
      title: "Well, this is awkward.",
      text: "It's like showing up to a party and realizing you're at the wrong address. Let's redirect you to where the real fun is!",
    },
    {
      title: "Oops! Looks like someone dropped the breadcrumbs.",
      text: "Good thing we've got a map to guide you back to civilization.",
    },
    {
      title: "Looks like you've reached the digital equivalent of a dead end.",
      text: "Let's turn this around and find a new path.",
    },
    {
      title: "Well, this is embarrassing.",
      text: "It's like tripping over your own shoelaces in cyberspace. Let's dust you off and get you back on track.",
    },
    {
      title: "Oops! Looks like the cat walked across the keyboard again.",
      text: "Let's untangle this feline mischief and find what you're looking for.",
    },
    {
      title: "Lost in cyberspace?",
      text: "Fear not, you've just discovered our secret 404 page. It's like finding a hidden treasure, but with more error codes.",
    },
    {
      title:
        "Looks like you've stumbled upon the digital equivalent of a lost sock.",
      text: "Let's get you back on the right track!",
    },
    {
      title: "Oops! You've ventured into the abyss of cyberspace.",
      text: "Don't worry, there are no monsters here. Well, maybe a few broken links.",
    },
    {
      title: "Houston, we have a problem... navigating to this page.",
      text: "Looks like you're lost in space, but don't worry, we'll guide you back to civilization.",
    },
  ];

  const [displayMessage, setDisplayMessage] = useState({ title: "", text: "" });

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 10);

    setDisplayMessage(messages[randomNumber]);
  }, []);

  return (
    <>
      <Container className={classes.root}>
        <div className={classes.label}>404</div>
        <Title className={classes.title}>{displayMessage.title}</Title>
        <Text c="dimmed" size="lg" ta="center" className={classes.description}>
          {displayMessage.text}
        </Text>
        <Group justify="center">
          <Button
            variant="subtle"
            size="md"
            onClick={() => {
              navigate("/");
            }}
          >
            Take me back to home page
          </Button>
        </Group>
      </Container>
    </>
  );
};
