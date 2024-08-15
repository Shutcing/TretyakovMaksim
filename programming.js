d; /*---Consts-------------------------------------------------*/
var Width = $(window).width();
var Height = $(window).height();
let maketsImgs = [
  "PortImg/myWorks/sitePortfolio/portfolio",
  "PortImg/myWorks/strangeFood/strangeFood",
  "PortImg/myWorks/myPaint/myPaint",
];

const maketTitles = ["Сайт портфолио", "StrangeFood", "Растровый редактор"];
const maketTexts = [
  [
    "Мой персональный сайт, который совмещает в себе программистское портфолио и лендинг для моих репетиторских услуг по математике",
    "HTML, SCSS и JavaScript, jQuery, методология БЭМ, Figma",
  ],
  [
    "Созданный мной проект сервиса для поиска ресторанов с необычными меню в Екатеринбурге",
    "HTML, CSS, методология БЭМ, Figma",
  ],
  [
    "Приложение позволяет создавать и редактировать изображения при помощи рисования, фильтров или создания геометрических фигур",
    "Python, Customtkinter, Pillow",
  ],
];
const links = [
  "http://127.0.0.1:5500/programming.html",
  "https://shutcing.github.io/StrangeFood-2/",
  "https://github.com/Shutcing/MyPaint",
];

var CurrentPlt = "";

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

/*----LOGO------------------------------------------------*/
$(".logo").css("width", Width);
$(".logo").css("height", Height * 0.1);
$(".logo__img").css("top", $(".logo").height() * 0.05);
$(".logo__img").css("left", $(".logo").height() * 0.05);
$(".logo__img").css({
  width: Math.max($(".logo").height(), $(".logo").width()) * 0.2,
});
$(".logo__circle").css({
  width: `${Math.max($(".logo").height(), $(".logo").width()) * 0.3}px`,
  height: `${Math.max($(".logo").height(), $(".logo").width()) * 0.3}px`,
});

$(".logo__circle").css({
  top: `-${$(this).width() / 15}px`,
  left: `-${$(this).width() / 35}px`,
});

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
        width: Math.max($(".logo").height(), $(".logo").width()) * 0.33,
        height: Math.max($(".logo").height(), $(".logo").width()) * 0.33,
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

/*-----Size Control------------------------------------------------------*/
const fontS = (Width * 16) / 1400;
$("body").css({
  fontSize: `${fontS}px`,
});

/*-----Spiral----------------------------------------------------------*/
const svg = $(".spiral");
const platform = $(".platform");
if (Width >= Height) {
  $(".platform__content").css({
    width: `${(Width / 100) * 17.36}px`,
    height: `${((Width / 100) * 17.36) / 1.5}px`,
  });
} else {
  $(".platform__content").css({
    width: `${(Height / 100) * 30}px`,
    height: `${((Height / 100) * 30) / 1.5}px`,
  });
}
if (Width >= Height) {
  $(".line__text").css({
    fontSize: "270%",
  });
} else {
  $(".line__text").css({
    fontSize: "800%",
    textShadow: `5px 5px 5px rgba(0, 0, 0, 0.5)`,
  });
}
let speed = 0.3;
platform.css({
  top: `${-$(".platform__content").height() / 2}px`,
  left: `${$(".platform__content").width() / 2}px`,
});

svg.attr({
  width: `${Width}`,
  height: `${Height}`,
  viewBox: `0 0 ${Width} ${Height}`,
});

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
function ParseD(d) {
  d = d.split(" ");
  let result = [];
  for (let i = 0; i < d.length; i++) {
    if (i % 3 != 0) {
      result.push(new Point(Number(d[i]), Number(d[i + 1])));
      i++;
    }
  }
  return result;
}

class Platform {
  constructor(platform, images, link) {
    this.platform = platform;
    this.platformTop = (-Height / 100) * 15;
    this.platformRight =
      Width / 2 + Width / 4 + Width / 16 - platform.width() / 2;
    this.scale = 1;
    this.picCount = 0;
    this.plane = "l";
    this.moveId;
    this.isMoving = false;
    this.images = images;
    this.link = link;
  }

  startMove() {
    this.isMoving = true;
    this.platform.css({
      transform: `translate(${this.platformRight}px, ${this.platformTop}px)`,
      display: "block",
    });
    this.moveId = setInterval(() => {
      var personalSpeed = speed;
      for (let plt of pltArray) {
        if (
          Math.abs(plt.platformTop - this.platformTop) < Height / 2 &&
          plt.platform != this.platform &&
          plt.platformTop > this.platformTop
        ) {
          personalSpeed = 0;
        }
      }
      this.platformTop += personalSpeed;
      if (Width >= Height) {
        var sinus = Math.sin(this.platformTop / (Height * (80 / 742))).toFixed(
          4
        );
        this.platformRight =
          Width * (250 / 1488) * sinus +
          (3 * Width) / 4 -
          this.platform.width() / 2;
      } else {
        var sinus = Math.sin(
          this.platformTop / (Height * (426 / (1.4 * Math.PI * 800)))
        ).toFixed(4);
        this.platformRight =
          Width * (196.5 / 350) * sinus + Width / 2 - platform.width();
      }

      this.platform.css({
        transform: `translate(${this.platformRight}px, ${this.platformTop}px)`,
      });
      if (sinus > 0.999 && this.plane == "l") {
        this.plane = "r";
        if (speed > 0) {
          this.picCount++;
        } else {
          this.picCount--;
        }
      } else if (sinus < -0.999 && this.plane == "r") {
        this.plane = "l";
        if (speed > 0) {
          this.picCount++;
        } else {
          this.picCount--;
        }
      }
      if (this.platformTop > Height * 1.25) {
        this.platform.css({
          display: "none",
        });
        this.platformTop = (-Height / 100) * 15;
        this.platformRight =
          Width / 2 + Width / 4 + Width / 16 - platform.width() / 2;
        this.scale = 1;
        this.picCount = 0;
        this.plane = "l";
        this.startMove();
        clearInterval(this.moveId);
      }
    }, 0.05);
  }
}

function ParsePoints(points) {
  let result = `M ${String(points[0].x)} ${String(points[0].y)}`;
  points.shift();
  for (let point of points) {
    result += " L";
    result += ` ${String(point.x)} ${String(point.y)}`;
  }
  return result;
}

const spiral = $(".spiral__path");
var d = [];

if (Width >= Height) {
  for (let y = -10; y <= Height + 100; y++) {
    x =
      Width * (250 / 1488) * Math.sin(y / (Height * (80 / 742))) +
      Width / 2 +
      Width / 4 +
      Width / 16;
    d.push(new Point(x, y));
  }
} else {
  for (let y = -10; y <= Height + 100; y++) {
    x =
      Width *
        (196.5 / 393) *
        Math.sin(y / (Height * (426 / (1.4 * Math.PI * 852)))) +
      Width / 2;
    d.push(new Point(x, y));
  }
}
spiral.attr({
  d: `${ParsePoints(d)}`,
});

const pltArray = [];

var pltIndex = 1;
const pltId = setInterval(() => {
  var plat1 = new Platform(
    $(`.platform${pltIndex}`),
    maketsImgs[pltIndex - 1],
    links[pltIndex - 1]
  );
  pltArray.push(plat1);
  $(`.platform${pltIndex}`).css({
    display: "block",
  });
  $(`.platform${pltIndex} .platform__content`).css({
    background: `url(${plat1.images + "0.png"}) no-repeat center center`,
    backgroundSize: "100% 100%",
  });
  plat1.startMove();
  pltIndex++;
  if (pltIndex >= 4) {
    clearInterval(pltId);
  }
}, 2000);

/*-----Plt Hover----------------------------------------------------------*/
const widthPlt = $(".platform__content").width();
const heightPlt = $(".platform__content").height();
$(".platform__content").hover(
  function () {
    if ($(".line__path").attr("d").length == 0) {
      $(this).animate(
        {
          width: widthPlt * 1.1,
          height: heightPlt * 1.1,
        },
        500
      );
    }
  },
  function () {
    if ($(".line__path").attr("d").length == 0) {
      $(this).animate(
        {
          width: widthPlt,
          height: heightPlt,
        },
        500
      );
    }
  }
);
/*---Click on maket----------------------------------------------------*/

if (Width >= Height) {
  $(".maket-line").css({
    strokeWidth: "2px",
    stroke: "#fe9102",
  });
  $(".platform").click(function () {
    const pltIndex =
      Number(this.classList[1][this.classList[1].length - 1]) - 1;
    const currentPlt = pltArray[pltIndex];
    CurrentPlt = currentPlt;
    if (currentPlt.isMoving && $(".line__path").attr("d").length == 0) {
      if (currentPlt.picCount >= 2) {
        speed = -2;
      } else {
        speed = 2;
      }
      const localId = setInterval(() => {
        if (
          currentPlt.picCount == 2 &&
          Math.sin(currentPlt.platformTop / 80) < -0.99
        ) {
          speed = 0;
          currentPlt.isMoving = false;
          currentPlt.platform.css({
            boxShadow: `0 0 ${
              (Width / 100) * 57.87
            }px 0 rgba(255, 255, 255, 0.5)`,
            zIndex: "3000",
          });
          $(".maket-line").css({
            zIndex: "1100",
          });
          clearInterval(localId);
          ShowPltLine(
            currentPlt.platformRight + widthPlt / 2,
            currentPlt.platformTop - heightPlt / 2,
            -4,
            -1.8,
            pltIndex
          );
        }
      }, 0.05);
    } else if ($(".line__text").text() == maketTitles[pltIndex]) {
      $(".maket-line").css({
        zIndex: "500",
      });
      currentPlt.platform.css({
        zIndex: "800",
      });
      HideHologram(currentPlt, ".hologram", ".hologram__place");
    }
  });
} else {
  $(".platform").click(function () {
    const pltIndex =
      Number(this.classList[1][this.classList[1].length - 1]) - 1;
    const currentPlt = pltArray[pltIndex];
    CurrentPlt = currentPlt;
    if (currentPlt.isMoving && $(".line__path").attr("d").length == 0) {
      if (currentPlt.picCount >= 2) {
        speed = -2;
      } else {
        speed = 2;
      }
      const localId = setInterval(() => {
        if (
          Math.abs(
            Math.sin(
              currentPlt.platformTop / (Height * (426 / (1.4 * Math.PI * 800)))
            )
          ) < 0.01 &&
          currentPlt.platformTop < Height / 2 &&
          currentPlt.platformTop > Height / 7
        ) {
          speed = 0;
          currentPlt.isMoving = false;
          currentPlt.platform.css({
            boxShadow: `0 0 ${Width}px 0 rgba(255, 255, 255, 0.5)`,
            zIndex: "3000",
          });
          $(".maket-line").css({
            zIndex: "1100",
          });
          clearInterval(localId);
          ShowPhoneHologram(
            Width / 2,
            currentPlt.platformTop + heightPlt / 4,
            pltIndex
          );
        }
      }, 0.05);
    } else if ($(".line__text").text() == maketTitles[pltIndex]) {
      $(".maket-line").css({
        zIndex: "500",
      });
      currentPlt.platform.css({
        zIndex: "800",
      });
      HideHologram(
        currentPlt,
        ".maket-phone__hologram",
        ".phone-hologram__place"
      );
    }
  });
}

function StartMovePlt(currentPlt) {
  currentPlt.platform.css({
    boxShadow: "",
  });
  currentPlt.isMoving = true;
  speed = 0.3;
}

/*----Plt Inf---------------------------------------------*/
$(".maket-line").attr({
  width: `${Width}`,
  height: `${Height}`,
  viewBox: `0 0 ${Width} ${Height}`,
});

function ShowPltLine(x, y, dx, dy, pltIndex) {
  const D = [];
  const infId = setInterval(function () {
    D.push(new Point(x, y));
    var copyD = D.slice();
    $(".line__path").attr({
      d: `${ParsePoints(copyD)}`,
    });
    x += dx;
    y += dy;
    if ((D[0].x - x) ** 2 + (D[0].y - y) ** 2 > widthPlt ** 2 * 0.75) {
      ShowPltCircle(x, y, pltIndex);
      clearInterval(infId);
    }
  }, 2);
}

function ShowPltCircle(x, y, pltIndex) {
  var r = 0;
  const circleInfId = setInterval(function () {
    $(".line__circle").attr({
      cx: x,
      cy: y,
      r: r,
    });
    r += 1;
    if (r > widthPlt / 14) {
      ShowTextLine(x, y, r, pltIndex);
      ShowHologram(x, y, pltIndex);
      clearInterval(circleInfId);
    }
  }, 5);
}

function ShowTextLine(x, y, r, pltIndex) {
  var D = [new Point(x - r * 2, y - r * 2)];
  const textLineInfId = setInterval(function () {
    var copyD = D.slice();
    $(".text-line__path").attr({
      d: `${ParsePoints(copyD)}`,
    });
    x += -6;
    D.push(new Point(x - r * 2, y - r * 2));
    if (Math.abs(D[0].x - x) > widthPlt * 1.2) {
      ShowTitle(x, y, maketTitles[pltIndex], pltIndex);
      clearInterval(textLineInfId);
    }
  }, 10);
}

function Blinking(obj, op, count, limit) {
  obj.animate(
    {
      opacity: op,
    },
    250,
    () => {
      setTimeout(() => {
        if (count != limit) {
          Blinking(obj, (op + 1) % 2, count + 1, limit);
        }
      }, 250);
    }
  );
}

function ShowTitle(x, y, text, pltIndex) {
  $(".line__text").attr({
    x: x,
    y: y - widthPlt * 0.25,
  });
  $(".type-line").attr({
    x1: x,
    y1: y - widthPlt * 0.25,
    x2: x,
    y2:
      y -
      widthPlt * 0.25 -
      Number(
        $(".line__text")
          .css("font-size")
          .slice(0, $(".line__text").css("font-size").length - 2)
      ),
  });

  var currentText = "";
  var ind = 0;
  Blinking($(".type-line"), 0, 0, 3);
  setTimeout(function () {
    const textInfId = setInterval(function () {
      $(".line__text").text(currentText);
      currentText += text[ind];
      ind++;
      x +=
        Number(
          $(".line__text")
            .css("font-size")
            .slice(0, $(".line__text").css("font-size").length - 2)
        ) / 2;
      $(".type-line").attr({
        x1: x,
        y1: y - widthPlt * 0.25,
        x2: x,
        y2:
          y -
          widthPlt * 0.25 -
          Number(
            $(".line__text")
              .css("font-size")
              .slice(0, $(".line__text").css("font-size").length - 2)
          ),
      });
      if (ind - 1 == text.length) {
        Blinking($(".type-line"), 0, 0, 2);
        ShowMaketGallery(pltArray[pltIndex]);
        clearInterval(textInfId);
      }
    }, 100);
  }, 1500);
}

function ShowHologram(x, y, pltIndex) {
  var epsX = 0;
  var epsY = 0;
  const hologramId = setInterval(function () {
    const D = [
      new Point(x, y),
      new Point(x - epsX, y + epsY),
      new Point(x, y + epsY),
    ];

    epsX += 16;
    epsY += 4;
    $(".hologram").attr({
      d: `${ParsePoints(D)}`,
    });

    if (epsX >= widthPlt * 2 && epsY >= 100) {
      clearInterval(hologramId);
      ShowHologramPlace(pltIndex);
      $(`.hologram__part`).css(
        {
          opacity: "1",
        },
        100
      );
      ShowHologramParts(".hologram");
    }
  }, 2);
}

function ShowPhoneHologram(x, y, pltIndex) {
  var epsX = 0;
  var epsY = 0;
  const hologramId = setInterval(function () {
    const D = [
      new Point(x, y),
      new Point(x - epsX, y + epsY),
      new Point(x + epsX, y + epsY),
    ];

    epsX += 5;
    epsY += 4;
    $(".maket-phone__hologram").attr({
      d: `${ParsePoints(D)}`,
    });

    if (epsX >= widthPlt / 1.4) {
      clearInterval(hologramId);
      ShowHologramParts(".maket-phone__hologram");
      ShowPhoneHologramPlace(pltIndex);
      $(`.hologram__part`).css(
        {
          opacity: "1",
        },
        100
      );
      ShowTitle(
        (Width -
          getTextWidth(
            maketTitles[pltIndex],
            $(".line__text").css("font-size")
          )) /
          2,
        y - heightPlt / 1.3,
        maketTitles[pltIndex],
        pltIndex
      );
      $(`.phone-hologram__place`).css(
        {
          opacity: "1",
        },
        100
      );
    }
  }, 2);
}

function ShowPhoneHologramPlace(pltIndex) {
  var arrayD = ParseD($(".maket-phone__hologram").attr("d"));
  $(`.phone-hologram__place`).attr({
    x: arrayD[1].x - widthPlt,
    y: arrayD[1].y,
    width: Width * 2,
    height: Height,
  });
  $(".hologram__text").css({
    fontSize: `${heightPlt / 10}px`,
  });
  $(".hologram__text").css({
    display: "flex",
    transform: `translate(${arrayD[1].x}px, ${arrayD[1].y + heightPlt / 3}px)`,
    width: `${arrayD[2].x - arrayD[1].x}px`,
  });
  $(".platform__inf-text").text(maketTexts[pltIndex][0]);
  $(".platform__technologies-text").text(maketTexts[pltIndex][1]);
}

var hologramPartsId;
function ShowHologramParts(hologram) {
  var arrayD = ParseD($(hologram).attr("d"));
  var x = arrayD[1].x;
  var y = arrayD[1].y;
  var epsX = 80;

  var epsCount = 0;

  hologramPartsId = setInterval(function () {
    for (let i = 1; i <= 3; i++) {
      var first = epsX * (epsCount + i * 2 - 1);
      var second = epsX * (epsCount + i * 2);
      if (second > arrayD[2].x - arrayD[1].x) {
        second = arrayD[2].x - arrayD[1].x;
      }
      if (first > arrayD[2].x - arrayD[1].x && i != 1) {
        first = arrayD[2].x - arrayD[1].x;
      }
      if (first > arrayD[2].x - arrayD[1].x && i == 1) {
        first = arrayD[2].x - arrayD[1].x;
        epsCount = -((arrayD[2].x - arrayD[1].x) / epsX);
      }

      if (second < 0) {
        second = 0;
      }
      if (first < 0) {
        first = 0;
      }
      var D = [
        new Point(arrayD[0].x, arrayD[0].y),
        new Point(x + first, y),
        new Point(x + second, y),
      ];
      $(`.hologram${i}`).attr({
        d: `${ParsePoints(D)}`,
      });
    }
    epsCount += 0.4;
  }, 1);
}

function ShowHologramPlace(pltIndex) {
  var arrayD = ParseD($(".hologram").attr("d"));
  $(`.hologram__place`).attr({
    x: arrayD[1].x - 10,
    y: arrayD[1].y - 5,
    width: arrayD[2].x - arrayD[1].x + 15,
    height: "300",
  });
  $(`.hologram__place`).animate(
    {
      opacity: "1",
    },
    100
  );
  $(".hologram__text").css({
    display: "flex",
    transform: `translate(${arrayD[1].x - 10 + fontS}px, ${
      arrayD[1].y - 5 + (fontS / 100) * 150 * 2
    }px)`,
    width: `${arrayD[2].x - arrayD[1].x - 15}px`,
  });
  $(".platform__inf-text").text(maketTexts[pltIndex][0]);
  $(".platform__technologies-text").text(maketTexts[pltIndex][1]);
}

function HideHologram(currentPlt, hologram, hologram__place) {
  var arrayD = ParseD($(hologram).attr("d"));
  var x = arrayD[1].x;
  var y = arrayD[1].y;
  var epsX = 0;
  var epsY = 0;
  $(hologram__place).animate(
    {
      opacity: "0",
    },
    100
  );
  $(`.hologram__part`).animate(
    {
      opacity: "0",
    },
    100
  );
  clearInterval(hologramPartsId);
  $(`.hologram1`).attr({
    d: "",
  });
  $(`.hologram2`).attr({
    d: "",
  });
  $(`.hologram3`).attr({
    d: "",
  });
  $(".hologram__text").css({
    display: "none",
  });
  const hologramId = setInterval(function () {
    const D = [
      new Point(arrayD[0].x, arrayD[0].y),
      new Point(x - epsX, y + epsY),
      new Point(arrayD[0].x, y + epsY),
    ];

    epsX -= 16;
    epsY -= 4;
    $(hologram).attr({
      d: `${ParsePoints(D)}`,
    });

    if (Math.abs(epsX) > arrayD[0].x - x && Math.abs(epsY) > arrayD[0].y - y) {
      $(hologram).attr({
        d: "",
      });
      if ($(".line__circle").attr("r") != "0") {
        HideCircle();
      }
      HideText(currentPlt);
      clearInterval(hologramId);
    }
  }, 2);
}

function HideCircle() {
  var r = $(".line__circle").attr("r");
  const hideCircleId = setInterval(() => {
    $(".line__circle").attr({
      r: r,
    });
    r--;

    if (r == 0) {
      $(".line__circle").attr({
        r: "0",
      });
      clearInterval(hideCircleId);
    }
  }, 10);
}

function HideText(currentPlt) {
  var x = $(".type-line").attr("x1");
  var y = $(".type-line").attr("y1");

  $(".type-line").attr({
    x1: x,
    y1: y,
    x2: x,
    y2: y - (fontS / 100) * 270,
  });

  var currentText = $(".line__text").text();
  const textInfId = setInterval(function () {
    $(".line__text").text(currentText);
    currentText = currentText.slice(0, currentText.length - 1);
    x -= ((fontS / 100) * 270) / 2;
    $(".type-line").attr({
      x1: x,
      y1: y,
      x2: x,
      y2: y - (fontS / 100) * 270,
    });
    if (currentText.length == 0) {
      $(".line__text").text("");
      if ($(".text-line__path").attr("d").length != 0) {
        HideTitleLine($(".text-line__path"));
      }
      if ($(".line__path").attr("d").length != 0) {
        HideTitleLine($(".line__path"));
      }
      HideMaketGallery(currentPlt);
      StartMovePlt(currentPlt);
      clearInterval(textInfId);
    }
  }, 100);
}

function HideTitleLine(line) {
  var D = ParseD(line.attr("d"));
  const textLineInfId = setInterval(function () {
    var copyD = D.slice();
    line.attr({
      d: `${ParsePoints(copyD)}`,
    });
    D.pop();
    if (D.length == 0) {
      setTimeout(function () {
        line.attr({
          d: ``,
        });
      }, 1000);
      clearInterval(textLineInfId);
    }
  }, 10);
}

function ShowMaketGallery(maket) {
  maket = maket.platform.children();
  maket.addClass("isShowing");
  var scale = 1;
  const scaleId = setInterval(() => {
    maket.css({
      transform: `scale(${scale})`,
    });
    scale += 0.01;
    if (scale >= 1.2) {
      clearInterval(scaleId);
    }
  }, 1);
}

function HideMaketGallery(maket) {
  maket = maket.platform.children();
  maket.removeClass("isShowing");
  var scale = 1.2;
  const scaleId = setInterval(() => {
    maket.css({
      transform: `scale(${scale})`,
    });
    scale -= 0.01;
    if (scale <= 1) {
      clearInterval(scaleId);
    }
  }, 1);
}

function getTextWidth(text, fontSize) {
  $("body").append(`
      <svg id="test_svg" class="maket-line">
        <text id='test' class="line__text" stroke="none"></text>
      </svg>
    `);
  $("#test").css({
    fontSize: fontSize,
  });
  $("#test").text(text);
  var textElement = document.querySelector("#test");
  var width = textElement.getBoundingClientRect().width;
  $("#test").remove();
  $("#test_svg").remove();
  return width;
}

/*----HeroMask----------------------------------------------------*/
if (Width > Height) {
  $(window).ready(() => {
    for (let i = 0; i < 50; i++) {
      var text = "";
      for (let j = 0; j < 20; j++) {
        text += "посмотреть услуги ";
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

/*-Form------------------------------------------------*/
const form = $(".form");
const iframe = $("iframe");
var isFormOpen = false;
form.hide();

$(".maket-line")
  .not(".notification")
  .click(() => {
    if (!isFormOpen) {
      isFormOpen = true;
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
            <iframe src="https://forms.yandex.ru/u/66b72fee90fa7b29a5642a3d/?iframe=1" frameborder="0" name="ya-form-66b72fee90fa7b29a5642a3d" width="650"></iframe>
          `);
          } else {
            $("iframe").css({
              opacity: "1",
            });
          }
        }, 500);
      });
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

/*-----Effects-----------------------------------------*/
let a = -30;
let b = 0;
$(".project-link").hover(
  function () {
    $($(".project-link")[0]).attr({
      href: CurrentPlt.link,
    });
    if (a == -30) {
      const element = $(this); // Сохраняем ссылку на текущий элемент
      let id = setInterval(function () {
        element.find(".project-link__button2").css({
          clipPath: `polygon(${a}% 0%, 100% 0%, 100% 100%, ${b}% 100%)`,
        });
        a += 2;
        b += 2;
        if (a == 40) {
          clearInterval(id);
        }
      }, 10);
    }
  },
  function () {
    if (a == 40) {
      const element = $(this); // Сохраняем ссылку на текущий элемент
      let id = setInterval(function () {
        element.find(".project-link__button2").css({
          clipPath: `polygon(${a}% 0%, 100% 0%, 100% 100%, ${b}% 100%)`,
        });
        a -= 2;
        b -= 2;
        if (a == -30) {
          clearInterval(id);
          element.find(".project-link__button2").css({
            clipPath: ``,
          });
        }
      }, 10);
    }
  }
);

let size = 1;
let offsets = ["-50%, -50%", "-50%, 50%", "50%, -50%", "50%, 50%"];
let index = -1;
let eps = 1;

$(".gallery__scroll").css({
  width: $(".platform__content").width(),
  height: $(".platform__content").height(),
});

function doGalleryScroll(event) {
  if ($(".gallery").css("zIndex") != "0") {
    if (event.originalEvent.deltaY > 0) {
      size *= 1.05;
      eps = 1;
    } else {
      size /= 1.05;
      eps = -1;
      if (size < 1) {
        size = 91;
      }
    }
    if (size > 90) {
      if (eps == 1) {
        size = 1;
      }
      index += eps;
      if (index > 3 || (index <= -1 && eps == -1)) {
        index = -1;
        $(".gallery").animate(
          {
            opacity: "0",
          },
          1000
        );
        $(".gallery").css({
          display: "none",
          zIndex: "0",
        });
        $(".gallery__scroll").html("SCROLL");
        $(".gallery__scroll").css({
          transform: `scale(1.001)`,
        });
        size = 1;
        return;
      }
      $(".gallery__scroll").css({
        opacity: "0",
      });
      $(".gallery__scroll").html(
        `<img src='${CurrentPlt.images}${index}.png' />`
      );
      $(".gallery__scroll").css({
        transitionDuration: "0s",
      });
      $(".gallery__scroll").css({
        transform: `translate(${offsets[index % 4]}) scale(1)`,
      });
      $(".gallery__scroll").animate(
        {
          opacity: "1",
        },
        100
      );
    } else {
      if ($(".gallery__scroll").text() == "") {
        $(".gallery__scroll").css({
          transform: `translate(${offsets[index % 4]}) scale(${size})`,
        });
        $(".gallery__scroll img").css({
          transform: `scale(${size * 2})`,
        });
      } else {
        $(".gallery__scroll").css({
          transform: `scale(${size * 1.5})`,
        });
      }
    }
  }
}

if (Width > Height) {
  $(window).on("wheel", (event) => doGalleryScroll(event));
} else {
}

let collageId, i;
$(".photos").click(() => {
  $(".gallery").css({
    display: "flex",
    zIndex: "999999",
  });
  $(".gallery").animate(
    {
      opacity: "1",
    },
    1000
  );

  let isGalleryOpen = false;
  if (Width < Height && !isGalleryOpen) {
    isGalleryOpen = true;
    $(".gallery").css({
      width: "100%",
    });
    $(".gallery__scroll").css({
      flexDirection: "column",
      width: "100%",
      height: "100%",
      gap: "2%",
      padding: "2%",
      zIndex: "999999",
    });
    $(".gallery__scroll").html("");
    $(".gallery__scroll").append(`
      <div class='gallery__collage'>
        <img src='${CurrentPlt.images}0.png' id='collage__0' class='collage__img' />
        <img src='${CurrentPlt.images}1.png' id='collage__1' class='collage__img' />
      </div>
      <div class='gallery__collage'>
        <img src='${CurrentPlt.images}2.png' id='collage__2' class='collage__img' />
        <img src='${CurrentPlt.images}3.png' id='collage__3' class='collage__img' />
      </div>
      <img src='PortImg/close.svg' id='close__all' style='position: absolute; z-index: 99999999;' />
    `);

    $(".gallery__collage").css({
      display: "flex",
      justifyContent: "center",
      zIndex: "9999999",
      flexGrow: "2",
      gap: "2%",
    });
    $(".collage__img").css({
      flexGrow: "2",
      objectFit: "cover",
    });

    i = 1;
    collageId = setInterval(() => {
      $(".collage__img").css({
        opacity: "0.5",
      });
      $(`#collage__${i}`).css({
        opacity: "1",
      });
      i = (i + 1) % 4;
    }, 1000);

    let isImgOpen = false;
    $(".collage__img").click(function () {
      if (!isImgOpen) {
        isImgOpen = true;
        $("#close__all").remove();
        console.log(this);
        clearInterval(collageId);
        $(".collage__img").css({
          opacity: "0",
          height: "auto",
        });
        $($(".gallery__collage")).css({
          order: "2",
        });
        $($(this).parents()).css({
          order: "1",
          alignItems: "end",
        });

        for (let item of $(".gallery__collage")) {
          if ($(item).css("order") == "2") {
            $(item).css({
              alignItems: "center",
            });
            $(item).append(`
              <img src='PortImg/close.svg' id='close' style='position: absolute; z-index: 99999999;' />
            `);
          }
        }
        $(this).css({
          flexGrow: "1",
          position: "absolute",
          height: "",
        });
        $(this).animate(
          {
            opacity: "1",
            width: "96%",
          },
          1000
        );
      }
    });

    $(".gallery__collage").click(function () {
      if ($(this).css("order") == "2" && isImgOpen) {
        isImgOpen = false;
        $("#close").hide();
        $("#close").remove();
        $(".collage__img").css({
          flexGrow: "2",
          objectFit: "cover",
          position: "",
          width: "",
        });
        $(".collage__img").animate(
          {
            opacity: "1",
            height: "100%",
          },
          100
        );
        $(".gallery__scroll").css({
          justifyContent: "center",
          alignItems: "center",
        });
        collageId = setInterval(() => {
          $(".collage__img").css({
            opacity: "0.5",
          });
          $(`#collage__${i}`).css({
            opacity: "1",
          });
          i = (i + 1) % 4;
        }, 1000);
        $(".gallery__scroll").prepend(`
          <img src='PortImg/close.svg' id='close__all' style='position: absolute; z-index: 99999999;' />
          `);
      }
    });

    $(document).click(function (e) {
      if (e.target.id == "close__all") {
        clearInterval(collageId);
        $(".gallery").animate(
          {
            opacity: "0",
          },
          500,
          () => {
            $(".gallery__scroll").html("");
            $(".gallery").css({
              display: "none",
              zIndex: "0",
            });
            isGalleryOpen = false;
          }
        );
      }
    });
  }
});
