"use client";

import { Loading } from "@/components/loading";
import { api } from "@/lib/api";
import { ApiResponse, User } from "@/lib/types";
import { Add, CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import {
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
import { ChangeEvent, useState } from "react";

export default function UsersList() {
  const theme = useTheme();
  const router = useRouter();

  const [page, setPage] = useState(0);
  const [take, setTake] = useState(25);
  const [sortBy, setSortBy] = useState<keyof User>("createdAt");
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  const { data, isLoading } = useQuery({
    queryKey: ["users", page, take, sortBy, order],
    queryFn: () =>
      api<ApiResponse<User>>("users", {
        method: "GET",
        params: {
          page: String(page),
          take: String(take),
          sortBy: String(sortBy),
          order,
        },
      }),
  });

  function onRedirectToDetail(userId: number) {
    router.push(`/users/${userId}`);
  }

  function onChangePage(_: unknown, newPage: number) {
    setPage(newPage);
  }
  function onChangeTake(event: ChangeEvent<HTMLInputElement>) {
    setTake(Number.parseInt(event.target.value, 10));
    setPage(0);
  }
  function onSort(property: keyof User) {
    const isAsc = sortBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setSortBy(property);
    setPage(0);
  }

  if (isLoading || !data) {
    return <Loading />;
  }

  return (
    <Paper>
      <Toolbar
        sx={{
          bgcolor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6">Users</Typography>
        <IconButton LinkComponent={NextLink} href="/users/new" color="inherit">
          <Add />
        </IconButton>
      </Toolbar>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {[
                { label: "Id", key: "id" as keyof User },
                { label: "Name", key: "name" as keyof User },
                { label: "Email", key: "email" as keyof User },
                { label: "Created at", key: "createdAt" as keyof User },
                { label: "Updated at", key: "updatedAt" as keyof User },
                { label: "Is active", key: "isActive" as keyof User },
              ].map((column) => (
                <TableCell key={column.key}>
                  <TableSortLabel
                    active={sortBy === column.key}
                    direction={sortBy === column.key ? order : "asc"}
                    onClick={() => onSort(column.key)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
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
                rowsPerPageOptions={[-1, 10, 25, 50]}
                onPageChange={onChangePage}
                onRowsPerPageChange={onChangeTake}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
}
