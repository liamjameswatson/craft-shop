import axios from "axios";

const BASE_URL = "http://localhost:8000/api/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OTQ0M2VkYjMxYWE5NGI1MzY2MTIxMiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY4NzYwOTE3MiwiZXhwIjoxNjk1Mzg1MTcyfQ.Sg6kGe8CFiR5B2IJvtbDyvKfefvL17P-rOoEoH7riqk";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});
