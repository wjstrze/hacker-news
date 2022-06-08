import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Articles, ArticlesDetails } from "./views/articles";

export const App = () => {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="articles" />} />
          <Route path="articles">
            <Route index element={<Articles />} />
            <Route path=":articleId" element={<ArticlesDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};
