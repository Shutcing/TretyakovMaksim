var Width = $(window).width();
var Height = $(window).height();
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

/*-----LOGO----------------------------------------------------*/
$(".logo").css("width", Math.max(Width, Height) * 0.25);
$(".logo").css("height", Math.max(Width, Height) * 0.25);
$(".logo__img").css("top", $(".logo").width() * 0.2);
$(".logo__img").css("left", $(".logo").width() * 0.2);
D = Math.sqrt(Width * Width + Height * Height);
d = Math.sqrt($(".logo").width() * $(".logo").width() * 2);
x1 = (D - d) / 2;
y1 = (Width - $(".logo").width()) / 2;
z1 = Math.sqrt(x1 * x1 - y1 * y1);
$(".logo").css("top", Math.max(Height) * (z1 / Height));

/*----Буковки-----------------------------------------------------------------*/
function shuffle(array) {
  let currentIndex = array.length;
  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}

var array = [
  "<HTML>",
  ".wrapper{}",
  "backgroud-color: #000;",
  "margin-top: 10px;",
  "<div class=”container”></div>",
  "<body></body>",
  ".header:hover{}",
  "opacity: 0.5;",
  "position: absolute;",
  ".header:hover{}",
  "<a href=”#” class=”link”></a>",
];

var imgArray = [
  "<img src='PortImg/math/Vector-0.png'>",
  "<img src='PortImg/math/Vector-1.png'>",
  "<img src='PortImg/math/Vector-2.png'>",
  "<img src='PortImg/math/Vector-3.png'>",
  "<img src='PortImg/math/Vector-4.png'>",
  "<img src='PortImg/math/Vector-5.png'>",
  "<img src='PortImg/math/Vector-6.png'>",
  "<img src='PortImg/math/Vector-7.png'>",
  "<img src='PortImg/math/Vector-8.png'>",
];

const levels = $(".level");
const mathLevels = $(".math-level");

function assign(container, contents) {
  for (item of container) {
    let content = "";
    shuffle(contents);
    for (elem of contents) {
      content += elem;
      content += "   ";
    }
    if (contents.length == 9) {
      $(item).append(content);
    } else {
      $(item).text(content);
    }
  }
}

assign(levels, array);
assign(mathLevels, imgArray);

function DoAnimation(i) {
  setTimeout(() => {
    $(levels[i]).addClass("move-class");
  }, 0);
  if (i < 5) {
    DoAnimation(i + 1);
  }
}

function DoAnimation2(i) {
  setTimeout(() => {
    $(mathLevels[i]).addClass("move-class-math");
  }, 0);
  if (i < 5) {
    DoAnimation2(i + 1);
  }
}
DoAnimation2(0);
DoAnimation(0);

/*------Math-------------------------------------------------------*/
const math = $(".math");
math.css("width", $(window).width());
math.css("height", $(window).height());
$(".layout").css("width", $(window).width());
$(".layout").css("height", $(window).height());
const mathCont = $(".math__container");
mathCont.css("width", $(window).width());
mathCont.css("height", $(window).height());

$(".math__container").click(() => {
  $("body").animate({ opacity: "0" }, 1000, () => {
    window.location.href = "math.html";
  });
});

$(".layout__container").click(() => {
  $("body").animate({ opacity: "0" }, 1000, () => {
    window.location.href = "programming.html";
  });
});

/*-------Effects---------------------------------------------------------*/
var X = 0;
var flag = false;

function makeSideVisible(showSide, hideSide) {
  $(hideSide[0]).css("opacity", "0.5");
  $(showSide[0]).css("opacity", "1");
  $(showSide[1]).css("display", "block");
  $(hideSide[1]).css("display", "none");
}

function showMath(id, limit) {
  X -= 0.1;
  if (X > 0) {
    $(".layout__container").css(
      "clip-path",
      `polygon(0 0, ${X}% 0, 100% ${100 - X}%, 100% 100%, 0 100%)`
    );
  } else if (X > -limit) {
    $(".layout__container").css(
      "clip-path",
      `polygon(0 ${-X}%, ${100 + X}% 100%, 0 100%)`
    );
  } else if (X < -limit) {
    clearInterval(id);
    flag = true;
  }
}

function showProgramming(id, limit) {
  X += 0.1;
  $(".layout__container").css(
    "clip-path",
    `polygon(${X}% 0, 100% ${100 - X}%, 100% 100%, 0 100%, 0 0)`
  );
  if (X > limit) {
    clearInterval(id);
    flag = false;
  }
}

if (Width > Height) {
  window.addEventListener("mousemove", function (event) {
    const x = event.clientX;
    const y = event.clientY;

    makeSideVisible(
      [".level", ".math__title"],
      [".marquee__wrapper", ".level__title"]
    );

    if (x * (Height / Width) - y > 20) {
      if (!flag || X == 0) {
        var id = setInterval(() => showMath(id, 15), 20);
      }

      $(".layout__container").css("z-index", "101");
      $(".math__container").css(
        "clip-path",
        "polygon(0 0, 0 100%, 100% 100%, 100% 0)"
      );
    } else {
      makeSideVisible(
        [".marquee__wrapper", ".level__title"],
        [".level", ".math__title"]
      );

      $(".layout__container").css("z-index", "101");

      if (X == 0 || flag) {
        var id = setInterval(() => showProgramming(id, 15), 20);
      }
    }
  });
} else {
  let showingIndex = 0;
  let id1 = 0;
  let id2 = 0;
  let mainId = setInterval(() => {
    if (!flag) {
      if (X == 0 || X >= 25) {
        makeSideVisible(
          [".level", ".math__title"],
          [".marquee__wrapper", ".level__title"]
        );
        $(".layout__container").css("z-index", "101");
        $(".math__container").css(
          "clip-path",
          "polygon(0 0, 0 100%, 100% 100%, 100% 0)"
        );
      }
      showMath(id1, 25);
    } else {
      if (X <= -25) {
        makeSideVisible(
          [".marquee__wrapper", ".level__title"],
          [".level", ".math__title"]
        );
        $(".layout__container").css("z-index", "101");
        showingIndex = 0;
      }
      showProgramming(id2, 25);
    }
  }, 10);
}

$(".math__title").css("top", Math.max(Width, Height) * 0.1);
$(".math__title").css("right", Math.max(Width, Height) * 0.1);
$(".level__title").css("bottom", Math.max(Width, Height) * 0.2);
$(".level__title").css("left", Math.max(Width, Height) * 0.1);
