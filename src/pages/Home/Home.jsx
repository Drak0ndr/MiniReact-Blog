import { Link } from '../../../miniReact/components/Link/Link'
import { API_CACHE } from '../../api/apiCache'
import { getPost } from '../../api/post/getPost'
import { getTag } from '../../api/tag/getTag'
import { Article } from '../../components/Article/Article'
import { Layout } from '../../components/Layout/Layout'
import { IconComment } from '../../icons/IconComment'
import { Button } from '../../ui/Button/Button'
import { FormElement } from '../../ui/FormElement/FormElement'
import { PageSize } from '../../ui/PageSize/PageSize'
import { Pagination } from '../../ui/Pagination/Pagination'
import { addQueryParams, getQueryParams } from '../../utils/queryParams'

import styles from './Home.module.css'

const loadSortHandler = (e) => {
   e.target.value = getQueryParams()['sorting'] || 'CreateDesc'
}

const loadCommunitiesHandler = (e) => {
   e.target.checked = getQueryParams()['onlyMyCommunities'] || false
}

const loadTagsHandler = (e) => {
   const activeOptions = getQueryParams()['tags']
   if (activeOptions) {
      Array.from(e.target.options).forEach((item) => {
         if (activeOptions.includes(item.value)) {
            item.selected = true
         }
      })
   }
}

const subminHandler = (e) => {
   e.preventDefault()
   const formData = new FormData(e.target)
   
   const tags = []
   let onlyMyCommunities = false

   for (const [key, value] of formData.entries()) {
      if (key == 'onlyMyCommunities') {
         onlyMyCommunities = true
      }
      if (key == 'tags') {
         tags.push(value)
      } else {
         addQueryParams(key, value)
      }
   }
   
   addQueryParams('tags', tags)
   if (!onlyMyCommunities) {
      addQueryParams('onlyMyCommunities', onlyMyCommunities)
   }
   addQueryParams('page', 1)
}

const Home = async () => {
   const res = await getPost()
   const data = await res.json()
   const posts = data['posts']
   const pagination = data['pagination']
   console.log(posts)

   let searchTags
   if (API_CACHE['getTag']) {
      searchTags = API_CACHE['getTag']
   } else {
      const searchTagRes = await getTag()
      searchTags = await searchTagRes.json()
      API_CACHE['getTag'] = searchTags
   }

   const queryParams = getQueryParams()
   const authorName = queryParams['author'] || ''
   const minValue = queryParams['min']
   const maxValue = queryParams['max']
   
   return (
      <Layout>
         {localStorage.getItem('token') ? (
            <div class={styles.right}>
               <Link href="/post/create">
                  <Button size="small">Написать пост</Button>
               </Link>
            </div>
         ) : (
            ''
         )}
         <section class={styles.filters}>
            <div class={styles.title}>
               <p>Фильтры</p>
            </div>
            <form class={styles.form} onSubmit={subminHandler}>
               <FormElement title="Поиск по имени автора" name="author" value={authorName} />
               <FormElement title="Поиск по тэгам">
                  <select name="tags" multiple onLoadElement={loadTagsHandler}>
                     {searchTags.map((item) => (
                        <option value={item.id}>{item.name}</option>
                     ))}
                  </select>
               </FormElement>
               <FormElement title="Сортировать">
                  <select name="sorting" onLoadElement={loadSortHandler}>
                     <option value="CreateDesc">По дате создания (сначала новые)</option>
                     <option value="CreateAsc">По дате создания (сначала старые)</option>
                     <option value="LikeDesc">По лайкам (сначала много)</option>
                     <option value="LikeAsc">По лайкам (сначала мало)</option>
                  </select>
               </FormElement>
               <FormElement title="Время чтения от" name="min" type="number" value={minValue} />
               <FormElement title="Время чтения до" name="max" type="number" value={maxValue} />
               <FormElement
                  title="Только мои группы"
                  name="onlyMyCommunities"
                  type="checkbox"
                  value="true"
                  onLoadElement={loadCommunitiesHandler}
               />
               <div>
                  <Button>Применить</Button>
               </div>
            </form>
         </section>
         <section>
            {posts.map((item) => (
               <Article
                  id={item.id}
                  author={item.author}
                  create={item.createTime}
                  communityName={item.communityName}
                  title={item.title}
                  description={item.description}
                  img={item.image}
                  tags={item.tags}
                  readingTime={item.readingTime}
                  comments={item.commentsCount}
                  likes={item.likes}
                  hasLiked={item.hasLike}
               />
            ))}
         </section>
         <div class={styles.pages}>
            <Pagination total={pagination.count} />
            <PageSize title="Количество постов на странице" options={[5, 10]} />
         </div>
      </Layout>
   )
}

export default Home
