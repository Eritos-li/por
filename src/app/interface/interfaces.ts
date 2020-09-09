export interface AnswerPosts {
    ok: boolean;
    //page: number;
    //posts: Post[];
  }
  
  /*export interface Post {
    img?: string[];
    descriptionImg?: string[];
    _id?: string;
    titleImg?: string;
    user?: User;
    created?: string;
    coordsPost?: string;
    // __v: number;
  }*/
  
  export interface User {
    avatar?: string;
    _id?: string;
    name?: string;
    email?: string;
    typeUser?: string;
    password?: string;
    coordsUser?: string;
    surnames?: string;
    run?: string;
    celphone?: string;
    gender?: string;
  
    // __v: number;
  }