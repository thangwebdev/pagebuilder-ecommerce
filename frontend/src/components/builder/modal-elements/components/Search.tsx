import React, { Dispatch, SetStateAction } from "react";
import Input from "~/components/ui/input";
import Stack from "@mui/material/Stack";
import { IoIosSearch } from "react-icons/io";

interface ISearchProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

function Search({ search, setSearch }: ISearchProps) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{ width: "100%", height: "100%" }}
    >
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Find an element"
        InputProps={{
          startAdornment: <IoIosSearch size={20} />,
        }}
        sx={{
          width: "200px",
          height: "30px",
          "& .MuiInputBase-root": { paddingLeft: "5px" },
          "& .MuiInputBase-input": {
            padding: "5px",
            fontSize: "13px",
            // height: "30px",
          },
        }}
      />
    </Stack>
  );
}

export default Search;
