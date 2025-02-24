$(function(){
    // 点击去注册帐号的链接
    $('#link_reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()

    })
    // 点击去登录的链接
    $('#link_login').on('click',function(){
        $('.reg-box').hide()
        $('.login-box').show()

    })

    // 从layui上获取form对象
    var form = layui.form
    var layer = layui.layer
    //通过form.verify()函数自定义校验规则
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ], 
        repwd: function(value){
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断//如果判断失败,则return一个提示消息即可
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !==value){
                return '两次密码不一致'
            }
        }
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit',function(e){
        // 1.阻止默认行为
        e.preventDefault()
        // 2.发起Ajax的post请求
        var data = { username: $('#form_reg [name=username]').val(),
                     password: $('#form_reg [name=password]').val() }
          
        $.post('http://127.0.0.1:8080/user/register',data,function(res){            
            if (res.code !==0){
                return layer.msg(res.message)
            }
            layer.msg('注册成功！')
            $('#link_login').click()
        })
    })
    //监听登录表单的提交事件
    $('#form_login').submit(function(e){
        // 1.阻止默认提交行为
        e.preventDefault()
        // 2.发起Ajax的请求
        $.ajax({
            url: '/user/login',
            method: 'POST',
            //快速获取表单数据
            data: $(this).serialize(),
            success: function(res){                
                if (res.code !==0){
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                // 将登录成功得到的token字符串，保存到localStorage中
                localStorage.setItem('token',res.data)
                //跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})