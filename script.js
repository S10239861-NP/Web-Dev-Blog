// The blog_entries_arr variable stores a list of BlogEntry objects.
var blog_entries_arr = JSON.parse(localStorage.getItem("blog_entries_arr"));

document.getElementsByClassName("manage_blog_posts_btn")[0].addEventListener("click", OnManageBlogPostsBtnClicked);

// (For one-time use only) Initialize the first few blog entries from previous updates to be added into the blog_entries_arr localStorage variable.
/*
blog_entries_arr[0] = new BlogEntry("Week 1", "This week, I learnt about how to use Visual Studio Code and Github to perform tasks like creating and cloning repositories as well as creating and editing HTML files.");

blog_entries_arr[1] = new BlogEntry("Week 2", "This week, I learnt about the basics of HTML and CSS, such as tags like the p tag and the header tags (e.g. h1, h2 tags).");

blog_entries_arr[2] = new BlogEntry("Week 3", "This week, I learnt about @media queries in CSS as well as ways I could use CSS to make the elements of my websites more visually appealing to users.");

blog_entries_arr[3] = new BlogEntry("Week 4", "This week, I learnt about how to use Git and Github, as well as an extension I could use in Visual Studio Code to integrate my Git/Github workflow with Visual Studio Code. I also learnt about commits and staging, as well as a brief overview about what branches and merging are.");

localStorage.setItem("blog_entries_arr", JSON.stringify(blog_entries_arr));
*/

if (blog_entries_arr == null)
{
    var blog_entries_arr = [];

    localStorage.setItem("blog_entries_arr", JSON.stringify(blog_entries_arr));
}
else
{
    for (let current_index = 0; current_index < blog_entries_arr.length; current_index++)
    {
        AddBlogEntryContainer(blog_entries_arr[current_index].title, blog_entries_arr[current_index].content);
    }
}

function AddBlogEntryContainer(blog_entry_title, blog_entry_content)
{
    blog_entry_container = document.createElement("div");

    blog_entry_container.className = "week_container";

    blog_entry_header = document.createElement("h2");

    blog_entry_header.appendChild(document.createElement("u"));

    blog_entry_header.getElementsByTagName("u")[0].innerHTML = blog_entry_title;

    blog_entry_para = document.createElement("p");

    blog_entry_para.innerHTML = blog_entry_content;

    blog_entry_container.appendChild(blog_entry_header);

    blog_entry_container.appendChild(blog_entry_para);

    document.getElementsByClassName("weeks_container")[0].appendChild(blog_entry_container);
}

function OnManageBlogPostsBtnClicked()
{
    window.location.href = "blog_entry_management_page/blog_entry_management_page.html";
}