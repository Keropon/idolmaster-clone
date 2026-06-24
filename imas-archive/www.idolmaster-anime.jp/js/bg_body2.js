var cssnumber = Math.floor(Math.random()*0+1);  
  if (cssnumber == 1)
      display = "../css/random/bg_movie.css";
  var css = '<'; 
  css+='link rel="stylesheet" href=' + display + ' \/'; 
  css+='>'; 
document.write(css);