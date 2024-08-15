var Width = $(window).width();
var Height = $(window).height();

if (Width > Height) {
  $(".notification").remove();
}

/*-----Loading------------------------------------------------------------*/
if (Width < Height) {
  $(".back").css({
    backgroundSize: "60% 60%",
  });
} else {
  $(".back").css({
    backgroundSize: "15% 15%",
  });
}
function hideLoader() {
  $("#loading").animate({ opacity: "0" }, 500, () => {
    $("#loading").css("display", "none");
  });
}
$(".back").ready(() => {
  $(".back").css({
    display: "block",
    width: Width,
    height: (Width * 9) / 16,
  });
});
window.addEventListener("load", hideLoader);

/*------Effects-----------------------------------------------*/
const field = $(".wrapper__container");

let coff = 1.2;

class MyObject {
  //x y dx dy mass width height
  constructor(x, y, dx, dy, mass, width, height, angle) {
    this.x = x;
    this.y = y;
    this.mass = mass;
    this.dy = dy;
    this.dx = dx;
    this.angle = angle; // Начальный угол
    this.angularVelocity = 0; // Начальная угловая скорость
    this.width = width;
    this.height = height;
    this.momentOfInertia = (mass / 12) * (width ** 2 + height ** 2); // Момент инерции прямоугольного объекта
  }

  updateAngle() {
    // Угловое ускорение
    let angularAcceleration = 0; // Здесь можно добавить внешние моменты сил, если они есть

    // Обновляем угловую скорость и угол
    this.angularVelocity += angularAcceleration;
    this.angle += this.angularVelocity;
  }
}

const bottom = new MyObject(
  Width / 2,
  (197 / 200) * Height,
  0,
  0,
  0,
  Width,
  Height / 100,
  0
);

const array = [];
const array2 = [];
var flag = true;

var g = 1;

function Random(min, max) {
  if (min > max) {
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let globalIndex = 1;

function StartFall() {
  let index = 1;
  const id = setInterval(() => {
    field.append(
      `<img src='PortImg/math2/math${index}.svg' class='math__obj math__obj${globalIndex}'/>`
    );

    const obj = $(`.math__obj${globalIndex}`);
    array2.push(obj);

    let x = 0;
    let y = 0;
    let dx = Random(10, 20);
    let dy = Random(2, 3);
    let mass = 0.5;
    let width = 300;
    let height = 300;
    const obj1 = new MyObject(x, y, dx, dy, mass, width, height, 45);

    array.push(obj1);

    Spawn(obj1, obj);

    Do(obj1, obj);

    if (index > 9 || !flag) {
      clearInterval(id);
      globalIndex++;
      coff -= 0.05;
      if (flag) {
        StartFall();
      }
    } else {
      index++;
      globalIndex++;
    }
  }, 1500);
}

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    $("img").remove(".math__obj");
    coff = 1.2;
    g = 1;
    globalIndex = 1;
  }
});

function Spawn(obj1, obj) {
  obj.css({
    top: -Height * 0.4,
    left: "0px",
    maxWidth: `${obj1.width}px`,
    maxHeight: `${obj1.height}px`,
    position: "absolute",
    transform: `rotate(${obj1.angle}deg)`,
    // transition: "transform 0.01s",
  });
}

function Update(obj1, obj) {
  obj1.y += obj1.dy;
  obj1.x += obj1.dx;
  obj1.updateAngle(); // Обновляем угол

  // Обновление CSS-стилей объекта
  obj.css({
    transform: `translate(${obj1.x}px, ${obj1.y}px) rotate(${obj1.angle}deg)`,
  });
}

function Do(obj1, obj) {
  const id = setInterval(() => {
    if (!flag) {
      obj1.dy = -16;
    }

    if (obj1.y >= Height * coff) {
      obj1.dy = -obj1.dy * 0.9;
      if (!flag) {
        obj1.dy = -16;
      }
      if (Math.abs(obj1.dy) < 0.001) {
        obj1.dy = 0;
        obj1.angularVelocity = 0;
      } else {
        obj1.angularVelocity += (Math.random() - 0.5) * Math.abs(obj1.dy) * 0.1; // Изменение угловой скорости при ударе о пол
        if (Math.abs(obj1.dy) < 1) {
          obj1.angularVelocity *= 0.5;
        } // Изменение угловой скорости при ударе о стену
      }
    } else {
      obj1.dy += g;
    }

    if (obj1.x >= Width || obj1.x <= -obj1.width) {
      if (Math.abs(obj1.dx) < 0.001) {
        obj1.dx = 0;
        obj1.angularVelocity = 0;
      } else {
        obj1.angularVelocity += (Math.random() - 0.5) * Math.abs(obj1.dx) * 0.1;
        if (Math.abs(obj1.dx) < 1) {
          obj1.angularVelocity *= 0.5;
        } // Изменение угловой скорости при ударе о стену
      }
      obj1.dx = -obj1.dx * 0.99;
      Update(obj1, obj);
    } else {
      obj1.dx *= 0.995;
      Update(obj1, obj);
    }

    // if (obj1.angularVelocity == 0 && obj1.angle != 45) {
    //   clearInterval(id);
    // }
  }, 30);
}

$(window).ready(StartFall());

/*----HeroMask----------------------------------------------------*/
if (Width > Height) {
  $(window).ready(() => {
    for (let i = 0; i < 50; i++) {
      var text = "";
      for (let j = 0; j < 20; j++) {
        text += "scroll ";
      }
      $(".hero__heading").append(
        `<div style='text-overflow: ellipsis; white-space: nowrap; overflow: hidden;'>${text}</div>`
      );
    }
  });

  const hero = document.querySelector("[data-hero]");

  window.addEventListener("mousemove", (e) => {
    const { clientX, clientY } = e;
    const x = Math.round((clientX / window.innerWidth) * 100);
    const y = Math.round((clientY / window.innerHeight) * 100);

    hero.style.setProperty("--x", `${x}%`);
    hero.style.setProperty("--y", `${y}%`);
  });
} else {
  $(".hero").css({
    display: "none",
  });
  $(".title__smile").append(`
    <div>(scroll down)</div> 
    `);
}

/*-----Scroll----------------------------------------------*/
$(".wrapper").scroll(function (event) {
  console.log(event);
  if ($("#loading").css("opacity") == 0) {
    flag = false;
    setTimeout(() => {
      $("img").remove(".math__obj");
    }, 10000);
    if (Width > Height) {
      $(".hero").animate({ opacity: "0" }, 1000, () => {
        $("body").append(`
              <div class="cursor">
                <img src="PortImg/Zakazat.svg" alt="" />
                <div class="cursor__inner">
                  <span>ТЫК</span>
                </div>
              </div>
          `);
        const cursor = $(".cursor");
        cursor.css({
          width: `${Width / 10}px`,
          height: `${Width / 10}px`,
        });
        $(".cursor__inner").css({
          width: `${cursor.width() * 0.6}px`,
          height: `${cursor.width() * 0.6}px`,
        });
        $("div").remove(".hero");
      });
    } else if ($(".notification")) {
      $(".notification").css({
        display: "block",
      });
      $(".notification").hide();
      $(".notification").show(1000);
      $(".notification__button").click(() => {
        $(".notification").hide(1000, () => {
          $(".notification").remove();
        });
      });
    }
  }
});
/*----LOGO------------------------------------------------*/
$(".logo").css("width", Width);
$(".logo").css("height", Height * 0.1);
$(".logo__circle").css({
  width: Math.max($(".logo").height(), $(".logo").width()) * 0.2,
  height: Math.max($(".logo").height(), $(".logo").width()) * 0.2,
  top: `-${(Width / 100) * 9}px`,
  left: `-${(Width / 100) * 3}px`,
});
$(".logo__img").css("top", $(".logo").height() * 0.05);
$(".logo__img").css("left", $(".logo").height() * 0.05);
$(".logo__img").css("width", "15%");

if (Width < Height) {
  $(".logo__circle").css({
    width: Math.max($(".logo").height(), $(".logo").width()) * 0.4,
    height: Math.max($(".logo").height(), $(".logo").width()) * 0.4,
    top: `-${(Width / 100) * 17}px`,
    left: `-${(Width / 100) * 8}px`,
  });
  $(".logo__img").css("top", $(".logo").height() * 0.05);
  $(".logo__img").css("left", $(".logo").height() * 0.05);
  $(".logo__img").css("width", "25%");
}

/*-----About--------------------------------------------*/
var showAboutFlag = false;
if (Width < Height) {
  $(".about__photo img").attr({
    src: "PortImg/me_mobile.svg",
  });
}
$(".logo__circle, .logo__img, .about").click(() => {
  if ($(".logo__img").attr("src") != "PortImg/logo.png") {
    OpenAboutMe();
  } else if (showAboutFlag) {
    CloseAboutMe();
  }
});

$(".maket-line").click(() => {
  if ($(".logo__img").attr("src") == "PortImg/logo.png" && showAboutFlag) {
    CloseAboutMe();
  }
});

function OpenAboutMe() {
  let logoImgWidth = Width > Height ? "10%" : "30%";
  $(".logo__img").animate(
    {
      width: logoImgWidth,
    },
    100
  );
  $(".logo__img").attr({
    src: "PortImg/logo.png",
  });
  if (Width > Height) {
    $(".logo__circle").animate(
      {
        left: `-${(Width / 100) * 16}px`,
        top: `-${(Width / 100) * 28}px`,
        width: `${Width}px`,
        height: `${Width}px`,
      },
      1000
    );
  } else {
    $(".logo__circle").animate(
      {
        borderRadius: "0",
        left: `-${0}px`,
        top: `-${0}px`,
        width: `${Width}px`,
        height: `${Height}px`,
      },
      1000
    );
    $(".logo__img").css("top", $(".logo").height() * 0.5);
    $(".logo__img").css("left", $(".logo").height() * 0.3);
  }
  ShowAboutInf();
}

function CloseAboutMe() {
  HideAboutInf();

  if (Width > Height) {
    $(".logo__img").animate(
      {
        width: "15%",
      },
      100
    );
    $(".logo__img").attr({
      src: "PortImg/about.png",
    });
    $(".logo__circle").animate(
      {
        top: `-${(Width / 100) * 9}px`,
        left: `-${(Width / 100) * 3}px`,
        width: Math.max($(".logo").height(), $(".logo").width()) * 0.2,
        height: Math.max($(".logo").height(), $(".logo").width()) * 0.2,
      },
      1000
    );
  } else {
    $(".logo__img").animate(
      {
        width: "25%",
      },
      100
    );
    $(".logo__img").attr({
      src: "PortImg/about.png",
    });
    $(".logo__img").css("top", $(".logo").height() * 0.05);
    $(".logo__img").css("left", $(".logo").height() * 0.05);
    $(".logo__circle").animate(
      {
        borderRadius: "100%",
        top: `-${(Width / 100) * 17}px`,
        left: `-${(Width / 100) * 8}px`,
        width: Math.max($(".logo").height(), $(".logo").width()) * 0.4,
        height: Math.max($(".logo").height(), $(".logo").width()) * 0.4,
      },
      1000
    );
  }
  setTimeout(() => {
    showAboutFlag = false;
  }, 1000);
}

function ShowAboutInf() {
  $(".about").css({
    display: "flex",
  });
  $(".about__photo img").css({
    animationName: "showPhoto",
  });
  ShowText("Привет, я Максим Третьяков!", ".hello");
  pointsTexts = [
    "Люблю спорт, JavaScript и кофе :3",
    "Преподаватель математики в Tetrika",
    "Студент 2 курса ФИИТ УРФУ",
  ];
  for (let i = 0; i < $(".about__point").length; i++) {
    let point = $(".about__point")[i];
    let text = pointsTexts.pop();
    setTimeout(() => {
      ShowText(text, $(point).find("div"));
      $(point).find("img").hide();
      let imgSize = (Width / 100) * 3;
      if (Width < Height) {
        imgSize = (Width / 100) * 6;
      }
      $(point)
        .find("img")
        .css({
          width: `${imgSize}px`,
          height: `${imgSize}px`,
        });
      $(point).find("img").show(1000);
    }, 2000 * (i + 1));
  }
  setTimeout(() => {
    showAboutFlag = true;
  }, 8000);
}

function HideAboutInf() {
  $(".about").css({
    display: "none",
  });
  for (let i = 0; i < $(".about__point").length; i++) {
    let point = $(".about__point")[i];
    $(point).find("div").html("");
    $(point).find("img").css({
      width: "0px",
      height: "0px",
    });
  }
}

function ShowText(text, textWrapper) {
  let helloText = text;
  let currentText = "";
  const id = setInterval(() => {
    if (currentText == text) {
      if (text.includes("ФИИТ")) {
        $(textWrapper).html(
          `Студент 2 курса <a href="https://fiit-urfu.ru/?ysclid=lzkw8snmpf265622900#tab-2k" target="_blank">ФИИТ</a> УРФУ`
        );
      }
      clearInterval(id);
    } else {
      currentText += helloText[0];
      helloText = helloText.slice(1, helloText.lenght);
      $(textWrapper).html(currentText);
    }
  }, 50);
}

/*--------Slider----------------------------------------------*/
const slider = $("slider");
const card = $(".slider__card");
const card1 = $(".card1");
const card2 = $(".card2");
const card3 = $(".card3");
var isCardHover = false;
var isFormOpen = false;

card.css({
  width: Math.max(Width, Height) * 0.2,
  height: Math.max(Width, Height) * 0.3,
});

$(".slider__circles").css({
  margin: `2% 0 0 ${
    card1.height() * 0.42261826174 + card1.width() * 0.90630778703 * 0.75
  }px`,
});
ChangeTransition(1);

var flag1 = true;
var iterationCount = 1;
var posled = ["Скоро", "Скоро", "Скоро"];
$(`.card1`).html(posled[0]);
$(".card2").html(posled[1]);
$(".card3").html(posled[2]);

card.hover(
  () => {
    isCardHover = true;
    $(".cursor").css({
      opacity: "0",
    });
  },
  () => {
    isCardHover = false;
    if (!isFormOpen) {
      $(".cursor").css({
        opacity: "1",
      });
    }
  }
);

card1.hover(
  () => {
    if (flag1) {
      card1.css({
        transform: "translate(60%, 0%) rotate(-25deg) scale(1) ",
      });
    }
  },
  () => {
    if (flag1) {
      card1.css({
        transform: "translate(60%, 0%) rotate(-25deg) scale(0.9) ",
      });
    }
  }
);

card3.hover(
  () => {
    if (flag1) {
      card3.css({
        transform: "translate(-60%, 0%) rotate(25deg) scale(1)",
      });
    }
  },
  () => {
    if (flag1) {
      card3.css({
        transform: "translate(-60%, 0%) rotate(25deg) scale(0.9)",
      });
    }
  }
);

function changeCardsToRight() {
  iterationCount++;
  if (iterationCount > 3) {
    $(`.circle${3}`).css({
      opacity: "0.5",
    });
    iterationCount = 1;
  }

  flag1 = false;
  ChangeTransition(1);

  card1.css({
    transform: `translate(103%, 0%) rotate(0deg) scale(1)`,
    opacity: "1",
    zIndex: "21",
  });

  card2.css({
    transform: "translate(43%, 0%) rotate(25deg) scale(0.9)",
    opacity: "0.5",
    zIndex: "20",
  });
  $(".card3").css({
    transform: "translate(-143%, 0%) rotate(-25deg) scale(0.9) ",
    opacity: "0.8",
    zIndex: "19",
  });

  $(`.circle${iterationCount}`).css({
    opacity: "1",
  });
  $(`.circle${iterationCount - 1}`).css({
    opacity: "0.5",
  });

  var last = posled.pop();
  posled.unshift(last);
  setTimeout(ChangeClasses, 700);
}

function changeCardsToLeft() {
  iterationCount--;
  if (iterationCount <= 0) {
    $(`.circle${1}`).css({
      opacity: "0.5",
    });
    iterationCount = 3;
  }

  flag1 = false;
  ChangeTransition(1);

  $(".card3").css({
    transform: "translate(-100%, 0%) rotate(0deg) scale(1)",
    opacity: "1",
    zIndex: "21",
  });

  card2.css({
    transform: "translate(-43%, 0%) rotate(-25deg) scale(0.9)",
    opacity: "0.8",
    zIndex: "20",
  });

  card1.css({
    transform: `translate(143%, 0%) rotate(25deg) scale(0.9)`,
    opacity: "0.5",
    zIndex: "19",
  });

  $(`.circle${iterationCount}`).css({
    opacity: "1",
  });
  $(`.circle${iterationCount + 1}`).css({
    opacity: "0.5",
  });

  var first = posled.shift();
  posled.push(first);
  setTimeout(ChangeClasses, 700);
}

function ChangeClasses() {
  ChangeTransition(0);

  $(`.card1`).css({
    opacity: "0.8",
    zIndex: "20",
    transform: "translate(60%, 0%) rotate(-25deg) scale(0.9) ",
  });
  $(".card2").css({
    opacity: "1",
    zIndex: "21",
    transform: "translate(0%, 0%) rotate(0deg) scale(1)",
  });
  $(".card3").css({
    opacity: "0.5",
    zIndex: "19",
    transform: "translate(-60%, 0%) rotate(25deg) scale(0.9)",
  });

  $(`.card1`).html(posled[0]);
  $(".card2").html(posled[1]);
  $(".card3").html(posled[2]);

  flag1 = true;

  setTimeout(() => {
    ChangeTransition(1);
  }, 50);
}

card1.click(changeCardsToRight);
card3.click(changeCardsToLeft);

if (Width < Height) {
  let xStart;

  window.addEventListener("touchstart", function (event) {
    xStart = event.touches[0].clientX;
  });

  window.addEventListener("touchmove", function (event) {
    let xMove = event.touches[0].clientX;
    if (xStart - xMove > 0) {
      changeCardsToRight();
    } else {
      changeCardsToLeft();
    }
  });
}

function ChangeTransition(time) {
  $(`.card1`).css({
    transition: `${time}s`,
  });
  $(".card2").css({
    transition: `${time}s`,
  });
  $(".card3").css({
    transition: `${time}s`,
  });
}

/*----Main--------------------------------------------*/

$(".information__title").css({
  fontSize: `${(Width / 100) * 2.5}px`,
});

$(".information__content").css({
  fontSize: `${(Width / 100) * 2}px`,
});

$(".information__img").css({
  marginBottom: `${(Width / 100) * 2.2}px`,
});

$(function () {
  $(".marquee").marquee({
    duration: 7000,
    startVisible: true,
    duplicated: true,
  });
});

/*--Cursor-------------------------------------------*/

$(document).on("mousemove", function (evt) {
  const cursor = $(".cursor");
  if (cursor.length > 0) {
    cursor.css({ left: evt.pageX, top: evt.pageY, transition: "opacity 1s" });
  }
});

/*-Form------------------------------------------------*/
const form = $(".form");
const iframe = $("iframe");
form.hide();

function showForm() {
  const cursor = $(".cursor");
  if ((cursor.length > 0 || Width < Height) && !isCardHover && !isFormOpen) {
    isFormOpen = true;
    $(".cursor").css("opacity", "0");
    $(".main").css("cursor", "auto");
    form.show(1000, () => {
      $(".close").css({
        width: `${Math.max((form.width(), form.height()) / 100) * 6}px`,
        height: `${Math.max((form.width(), form.height()) / 100) * 6}px`,
      });
      var w = $(".close__line").width();
      var h = $(".close__line").height();
      $(".close__line").css({
        top: `${Math.sqrt(2 * (w * w + h * h)) / 4 + 4 * h}px`,
        right: `${4 * h}px`,
      });
      $(".close").animate(
        {
          opacity: 1,
        },
        1000
      );
      setTimeout(() => {
        if ($("iframe").length <= 0) {
          form.append(`
            <iframe src="https://forms.yandex.ru/u/668d605f43f74f3b118776e2/?iframe=1" frameborder="0" name="ya-form-668d605f43f74f3b118776e2" width="650" class="iform"></iframe>
          `);
        }
      }, 500);
    });
  }
}

$(document).click(() => {
  if ($(".notification").length == 0) {
    showForm();
  }
});

$(".close").click(() => {
  $(".main").css("cursor", "none");

  $("iframe").animate(
    {
      opacity: "0",
    },
    500
  );

  setTimeout(() => {
    form.hide(1000);
    $("iframe").remove(".iform");
  }, 500);

  $(".cursor").animate(
    {
      opacity: "1",
    },
    1000
  );
  setTimeout(() => {
    isFormOpen = false;
  }, 1000);
});

/*----Adaptive--------------------------------------------*/
if (Width > Height) {
  $("body").css({
    fontSize: `${(Height / 100) * 2.5}px`,
  });
  $("html").css({
    fontSize: `${(Height / 100) * 2.5}px`,
  });
} else {
  $("body").css({
    fontSize: `${(Width / 100) * 2.9}px`,
  });
  $("html").css({
    fontSize: `${(Width / 100) * 2.9}px`,
  });

  $(".slider__cards").css({
    margin: "0",
    justifyContent: "center",
  });

  $(".slider__circles").css({
    margin: "2% 0",
    justifyContent: "center",
  });

  $(".information__title").css({
    fontSize: `${(Width / 100) * 4}px`,
  });
}
