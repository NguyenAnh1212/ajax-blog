function addNewBlog(){
    //lay du lieu
    let title = $('#title').val();
    let content = $('#content').val();
    let category = $('#category').val();
    let newBlog = {
        title: title,
        content : content,
        category: {
            id: category
        }
    }
    // goi ajax
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(newBlog),
        //tên API
        url: "http://localhost:8080/blog",
        //xử lý khi thành công
        success: showAllBlog

    });
    //chặn sự kiện mặc định của thẻ
    event.preventDefault();
}

function showAllBlog() {
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/blog",
        success: function (blog) {
            let content = "";
            for (let i = 0; i < blog.length; i++) {
                content += `<tr>

<td>${blog[i].title}</td>
<td>${blog[i].content}</td>
<td><img src="${'http://localhost:8080/image/' + blog[i].image}" width="100px"></td>
<td>${blog[i].category.name}</td>
<td><button onclick="showEditForm(${blog[i].id})">Edit</button></td>
<td><button class="deleteBlog" onclick="deleteBlog(${blog[i].id})">Delete</button></tr>
</tr>`
            }
            $("#listBlog").html(content);
        }
    })
}
showAllBlog();

function deleteBlog(id){
    $.ajax({
        type: "DELETE",
        url: `http://localhost:8080/blog/${id}`,
        success: showAllBlog
    })
    event.preventDefault();
}

function showCate(){
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/blog/category",
        success: function (cate){
            let content = "";
            for (let i = 0; i < cate.length; i++) {
                content +=`<option value="${cate[i].id}">${cate[i].name}</option>`
            }
            $("#category").html(content);
            $("#category1").html(content);
        }

    })
}
showCate();

function showEditForm(id) {
    let content = `<button type="button" onclick="updateBlog(${id})">Update</button>`

    $.ajax({
        type: "GET",
        url: `http://localhost:8080/blog/${id}`,
        success: function (blog) {
            $(`#title1`).val(blog.title),
                $(`#content1`).val(blog.content),
                $(`#category1`).val(blog.category.name),
            $("#action").html(content)
        }
    })
}

function updateBlog(id) {
    //lay du lieu
    let title = $('#title1').val();
    let content = $('#content1').val();
    let category = $('#category1').val();
    let newBlog = {
        title: title,
        content : content,
        category: {
            id: category
        }
    }
    // goi ajax
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        data: JSON.stringify(newBlog),
        //tên API
        url: "http://localhost:8080/blog/"+id,
        //xử lý khi thành công
        success: showAllBlog
    })
}


// function update(id) {
//     $.ajax({
//         url: "/blog",
//         type: "GET",
//         dataType: "json",
//         success: function (data) {
//
//         }
//     })
//
// }



