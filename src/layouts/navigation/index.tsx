import { useState } from "react";

import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Popper from "@mui/material/Popper";
import SearchIcon from "@mui/icons-material/Search";

import MenuComponent from "./components/MenuItem";
import PoperMenuItem from "./components/PoperMenuItem";
import { AGE_LIST, CATEGORY_LIST } from "../../constants/navigation";

export default function Navigation() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popper" : undefined;
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static' sx={{ backgroundColor: "#004433" }}>
                <Toolbar style={{ paddingRight: "10vw", paddingLeft: "10vw" }}>
                    <IconButton
                        size='large'
                        edge='start'
                        color='inherit'
                        aria-label='menu'
                        type='button'
                        onClick={handleClick}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box display='flex' sx={{ flexGrow: 1 }}>
                        {CATEGORY_LIST.map((category) => (
                            <MenuComponent
                                title={category.title}
                                url={category.url}
                                subTitles={category.subTitles}
                            />
                        ))}
                        <Divider
                            style={{ borderColor: "#ffffff" }}
                            orientation='vertical'
                            flexItem
                        />
                        {AGE_LIST.map((age) => (
                            <MenuComponent
                                title={age.title}
                                // <Link to={subTitles.url}>{subTitles.subTitle}</Link>
                                subTitles={age.subTitles}
                                url={age.url}
                            />
                        ))}
                    </Box>
                    <Popper
                        id={id}
                        open={open}
                        placement='bottom-start'
                        anchorEl={anchorEl}
                        sx={{ zIndex: 999 }}
                    >
                        <PoperMenuItem setAnchorEl={setAnchorEl} />
                    </Popper>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder='Search…'
                            inputProps={{ "aria-label": "search" }}
                        />
                    </Search>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "12ch",
            "&:focus": {
                width: "20ch",
            },
        },
    },
}));
