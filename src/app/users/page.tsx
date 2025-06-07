"use client";

import { Loading } from "@/components/loading";
import { getUsers, User } from "@/services/users";
import { Add, CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UsersList() {
  const theme = useTheme();
  const router = useRouter();

  const [page] = useState(0);
  const [take] = useState(25);
  const [sortBy] = useState<keyof User>("createdAt");
  const [order] = useState<"asc" | "desc">("desc");

  const { data, isLoading } = useQuery({
    queryKey: ["users", page, take, sortBy, order],
    queryFn: () => getUsers({ page, take, sortBy, order }),
  });

  function onRedirectToDetail(userId: number) {
    router.push(`/users/${userId}`);
  }

  if (isLoading || !data) {
    return <Loading />;
  }

  return (
    <Box sx={{ maxWidth: "100%", padding: 5 }}>
      <Paper>
        <Toolbar
          sx={{
            bgcolor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6">Users</Typography>
          <IconButton
            LinkComponent={NextLink}
            href="/users/new"
            color="inherit"
          >
            <Add />
          </IconButton>
        </Toolbar>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel>Id</TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel>Name</TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel>Email</TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel>Created at</TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel>Updated at</TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel>Is active</TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.items.map((user) => (
                <TableRow
                  key={user.id}
                  onClick={() => onRedirectToDetail(user.id)}
                  sx={{
                    cursor: "pointer",
                    "&:hover": { backgroundColor: theme.palette.action.hover },
                  }}
                >
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(user.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {user.isActive ? <CheckBox /> : <CheckBoxOutlineBlank />}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  showFirstButton
                  showLastButton
                  count={data.total}
                  rowsPerPage={take}
                  page={page}
                  onPageChange={() => {}}
                  onRowsPerPageChange={() => {}}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
