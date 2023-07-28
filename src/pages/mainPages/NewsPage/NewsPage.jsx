import React, { useEffect, useState } from 'react';
import Title from 'components/Title/Title';
import theme from 'components/theme';
import { useAuth } from 'hooks';
import { Helmet } from 'react-helmet';
import { FlexBox } from '../NoticesPage/NoticesPage.styled';
import NewsList from 'components/NewsList/NewsList';
import FormSearch from 'components/FormSearch/FormSearch';
import axios from 'axios';
import { Pagination } from '../../../components/Pagination/Pagination';

const getNews = async page => {
  const res = await axios.get('api/news', { params: { page: page } });
  return res.data;
};

const NewsPage = () => {
  const { currentTheme } = useAuth();
  const [newsList, setNewsList] = useState([]);
  const [quantityNews, setQuantityNews] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
    getNews(page).then(res => {
      const { quantityNews, news } = res;
      setNewsList(news);
      setQuantityNews(quantityNews);
    });
  }, [page]);

  return (
    <FlexBox>
      <Helmet>
        <title>News</title>
      </Helmet>

      <Title color={theme[currentTheme].color.secondary}>News</Title>

      <FormSearch />

      <NewsList newsList={newsList} />

      <Pagination
        currentPage={page}
        totalPages={Math.ceil(quantityNews / 10)}
        onPageChange={setPage}
        paginationLength={5} // Adjust this number as per your preference
      />
    </FlexBox>
  );
};

export default NewsPage;
