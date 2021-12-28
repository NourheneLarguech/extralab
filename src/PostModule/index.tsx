import * as React from "react";
import { FunctionComponent } from "react";
import { deletePostById, getAllPostData } from "../Api/Index";
import {postDataType } from "../Api/Types";
import AddPostModal from "../Components/AddPostModal";
import PostList from "../Components/PostList";

const sortByDate = (date1:Date, date2:Date)=>{
  return new Date(date2).getTime() - new Date(date1).getTime()
}

const PostModule: FunctionComponent = () => {
  const [posts, setPosts] = React.useState<postDataType[]>([]);

  const refreshData = () => {
    // obtenir les données et les trier selon la date
    getAllPostData().then((data) => setPosts(data.sort((el,next)=> sortByDate(el.creationDate, next.creationDate))));
  };

  const handleDelete = (id: number) => {
    deletePostById(id).then((response) => {
      if (response) {
        //Refresh data if  Delete is Done
        refreshData();
      } else {
        console.log("Could not Delete item " + id.toString());
      }
    });
  };
  
  React.useEffect(() => {
    refreshData();
  }, []);

  return (
    <>
      <AddPostModal refresh={refreshData} />
      <PostList handleDelete={handleDelete}  refresh={refreshData} data={posts} />
    </>
  );
};

export default PostModule;
