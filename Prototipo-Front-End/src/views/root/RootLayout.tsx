import { AppShell, Burger, Group, UnstyledButton } from "@mantine/core";
import { Link, Outlet } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import classes from "./style.module.css";

export default function RootLayouyt() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { desktop: true, mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Group justify="space-between" style={{ flex: 1 }}>
              {/* <MantineLogo size={30} /> */}
              <Group ml="xl" gap={0} visibleFrom="sm">
                <Link to="/home"> 
                <UnstyledButton className={classes.control}>
                  HomEEe
                </UnstyledButton>
                </Link>
                <UnstyledButton className={classes.control}>
                  Blog
                </UnstyledButton>
                <UnstyledButton className={classes.control}>
                  Contacts
                </UnstyledButton>
                <UnstyledButton className={classes.control}>
                  Support
                </UnstyledButton>
              </Group>
            </Group>
          </Group>
        </AppShell.Header>

        <AppShell.Navbar py="md" px={4}>
          <UnstyledButton className={classes.control}>Home</UnstyledButton>
          <UnstyledButton className={classes.control}>Blog</UnstyledButton>
          <UnstyledButton className={classes.control}>Contacts</UnstyledButton>
          <UnstyledButton className={classes.control}>Support</UnstyledButton>
        </AppShell.Navbar>

        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </>
  );
}
