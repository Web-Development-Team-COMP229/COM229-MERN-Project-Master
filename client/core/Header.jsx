import { useEffect, useState } from "react";

import {
  Grid,
  Hidden,
  Button,
  IconButton,
  Drawer,
  Box,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import { useLocation } from "react-router-dom";

import auth from "../lib/auth-helper";
import {
  COLOR_HEADER_BACKGROUND,
  COLOR_BTN_SELECTED_BACKGROUND,
} from "../lib/color-help";

function Header(props) {
  const HEIGHT_SIDEBAR_ROW = 50;

  const navItemsBeforeLogin = [
    { label: "Home", url: "/" },
    { label: "Login", url: "/signin" },
    { label: "Register", url: "/signup" },
  ];

  const navItemsAfterLogin = [
    { label: "Home", url: "/" },
    {
      label: "My Profile",
      url:
        "/user/" +
        (auth.isAuthenticated() ? auth.isAuthenticated().user._id : ""),
    },
    { label: "Add Appointment", url: "/addappointment" },
    { label: "My Appointment", url: "/myappointments" },
    {
      label: "Logout",
      url: "",
      callback: () => {
        auth.clearJWT(() => handleUrlRedirect("/"));
      },
    },
  ];

  const [navItems, setNavItems] = useState(
    auth.isAuthenticated() ? navItemsAfterLogin : navItemsBeforeLogin
  );
  const [currentPath, setCurrentPath] = useState("");
  const [state, setState] = useState({ right: false }); // for drawer
  let location = useLocation();

  useEffect(() => {
    setCurrentPath(location.pathname);
    if (auth.isAuthenticated()) {
      setNavItems(navItemsAfterLogin);
    }
  }, [location]);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const handleUrlRedirect = (url) => {
    window.location.href = url;
  };

  function getHorizontalNavItem(key, title, path, callback) {
    return (
      <div
        key={key}
        style={{
          minWidth: 130,
          height: "100%",
          display: "flex",
          alignItems: "center",
          paddingLeft: 5,
          paddingRight: 5,
          cursor: currentPath === path ? "" : "pointer",
        }}
        onClick={() => (callback ? callback() : handleUrlRedirect(path))}
      >
        <div
          style={{
            width: "100%",
            height: 30,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: currentPath === path ? 15 : 0,
            backgroundColor:
              currentPath === path
                ? COLOR_BTN_SELECTED_BACKGROUND
                : "transparent",
          }}
        >
          <span style={{ fontSize: 16, color: "white", fontWeight: "bold" }}>
            {title}
          </span>
        </div>
      </div>
    );
  }

  function getSideBarNavItem(key, title, path, callback) {
    return (
      <div
        key={key}
        style={{ height: HEIGHT_SIDEBAR_ROW, alignItems: "center" }}
      >
        <Button
          style={{ width: "100%", height: "100%" }}
          onClick={() => (callback ? callback() : handleUrlRedirect(path))}
        >
          <span
            style={{
              fontSize: 18,
              color: COLOR_HEADER_BACKGROUND,
              fontWeight: "bold",
              letterSpacing: 2,
            }}
          >
            {title}
          </span>
        </Button>
      </div>
    );
  }

  return (
    <>
      <Hidden xsDown>
        <Grid
          container
          style={{
            position: "sticky",
            height: 56,
            top: 0,
            paddingLeft: "3%",
            paddingRight: 0,
            backgroundColor: COLOR_HEADER_BACKGROUND,
            display: "flex",
            alignItems: "center",
            zIndex: 99,
          }}
        >
          <div
            style={{
              cursor: "pointer",
              display: "flex",
              justifyItems: "center",
            }}
          >
            <span
              style={{ fontWeight: "bold", fontSize: 36, color: "#EACE90" }}
            >
              WNTNCCC
            </span>
            {/* <img src="/logo.webp" height={48} width={48} style={{borderRadius: 5}} alt={'COMP229_Group4'} onClick={() => router.push('/')}/> */}
          </div>
          <div
            style={{
              width: 1,
              height: 25,
              marginLeft: 20,
              marginRight: 15,
              backgroundColor: "white",
            }}
          />
          <div
            style={{
              display: "flex",
              flex: 1,
              height: 50,
              overflowX: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                flex: 1,
                height: 50,
                overflowX: "scroll",
              }}
            >
              {navItems.map((item, index) =>
                getHorizontalNavItem(index, item.label, item.url, item.callback)
              )}
            </div>
          </div>
        </Grid>
      </Hidden>
      <Hidden smUp>
        <div
          style={{
            display: "flex",
            position: "sticky",
            height: 60,
            top: 0,
            paddingLeft: 24,
            paddingRight: 24,
            backgroundColor: COLOR_HEADER_BACKGROUND,
            zIndex: 99,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src="/logo.webp"
              height={48}
              width={48}
              style={{ borderRadius: 5 }}
              alt={"COMP229_Group4"}
              onClick={() => router.push("/")}
            />
          </div>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer("right", true)}
          >
            <MenuIcon style={{ color: "white", fontSize: 36 }} />
          </IconButton>
          <Drawer
            anchor="right"
            open={state.right}
            onClose={toggleDrawer("right", false)}
            sx={{
              ".MuiDrawer-paper": {
                bgcolor: "primary.main",
              },
            }}
          >
            <div
              style={{
                display: "flex",
                flex: 1,
                flexDirection: "column",
                width: 250,
                padding: 25,
                alignItems: "flex-end",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{ fontWeight: "bold", fontSize: 36, color: "#EACE90" }}
                >
                  WNTNCCC
                </span>
                <div
                  style={{ height: HEIGHT_SIDEBAR_ROW, alignItems: "center" }}
                >
                  <CloseIcon
                    style={{ fontSize: 36, color: COLOR_HEADER_BACKGROUND }}
                    onClick={toggleDrawer("right", false)}
                  />
                </div>
              </div>
              {navItems.map((item, index) =>
                getSideBarNavItem(index, item.label, item.url, item.callback)
              )}
              <div
                style={{
                  width: "100%",
                  height: 1,
                  backgroundColor: "#494E4E7F",
                  marginBottom: 20,
                  marginTop: 10,
                }}
              />

              <div
                style={{
                  width: "100%",
                  height: HEIGHT_SIDEBAR_ROW,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  src="/logo.webp"
                  height={48}
                  width={48}
                  style={{ borderRadius: 5 }}
                  alt={"COMP229_Group4"}
                  onClick={() => router.push("/")}
                />
              </div>
            </div>
          </Drawer>
        </div>
      </Hidden>
    </>
  );
}

export default Header;
