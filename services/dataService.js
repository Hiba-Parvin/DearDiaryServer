const db = require('./db')
const jwt = require("jsonwebtoken")

register = (fname, lname, userid, email, psw) => {
  today = new Date()
  //Storing the resolved output of findOne in a variable user, if present :- it returns object and if not present:- it returns null.
  return db.dduser.findOne({ userid }).then(user => {
    //if acno is present in db, then oject of that user gets returned else null is returned
    if (user) {
      return {
        status: false,
        message: "Account Already Present",
        statusCode: 404
      }
    }
    else {
      newUser = new db.dduser({
        fname: fname,
        lname: lname,
        userid: userid,
        email: email,
        password: psw,
        journal: []
      })
      newUser.save()
      return {
        status: true,
        message: "Account Registered Successfully",
        statusCode: 200
      }
    }

  })
}

login = (userid, psw) => {

  return db.dduser.findOne({ userid, password: psw }).then(user => {
    if (user) {
      //Storing Current User
      currentuser = user.userid
      //Token Creation
      const token = jwt.sign({ userid }, "superkey123")
      return {
        status: true,
        message: "Login Successfull",
        statusCode: 200,
        currentuser,
        token
      }
    }
    else {
      return {
        status: false,
        message: "Incorrect Account No: Or Password",
        statusCode: 404
      }
    }
  })

}

diary = (userid, diaryentry) => {
  //Converting String Amount To Integer
  console.log("server fn call : ", userid, diaryentry);
  today = new Date
  tdy=today.toDateString()
  return db.dduser.findOne({ userid }).then(user => {
    if (user) {
      user.journal.push({ date: tdy, diaryentry: diaryentry })
      user.save()
      return {
        status: true,
        message: `Journal Entry Successful`,
        statusCode: 200
      }
    }
    else {
      return {
        status: false,
        message: "Journal Entry Failed !",
        statusCode: 402
      }
    }
  })
}

getDiary = (userid) => {
  return db.dduser.findOne({userid}).then(user => {
    if (user) {
      return {
        status: true,
        journal: user.journal,
        statusCode: 200
      }
    }
  })

}

module.exports = {
  register,
  login,
  diary,
  getDiary
}