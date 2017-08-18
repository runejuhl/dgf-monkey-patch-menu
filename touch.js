/*
 * Monkey-patch dropdown menu on dengroennefrieskole.dk to disable hover on
 * touch devices;
*/

// since there's no stable way of detecting whether a device is using touch we
// use the touchstart event to rejigger the menu
document.addEventListener('touchstart', function (_e) {
  var selector = document.querySelectorAll('#menu-dgffrontmenu>li');
  var nodes = Array.prototype.slice.call(selector, 0);

  nodes.map(function(n) {
    // see if we have a submenu
    var submenu = n.querySelector('ul');
    if (!submenu) {
      return;
    }

    // clone node
    var nn = n.cloneNode(true);
    // remove any submenu to leave us with a single LI with an A inside
    var nnsubmenu = nn.querySelector('ul');

    nn.removeChild(nnsubmenu);

    n.classList.add('menu-item-top-level');

    nn.id = 'cloned-'+nn.id;
    nn.classList.remove('menu-item-has-children');
    submenu.prepend(nn);

    n.onclick = function(ce) {

      this.classList.toggle('selected');

      // only react on top-level menu events
      if (ce.target.nodeName === 'A' && ce.target.href !== '#')
        return;

      ce.preventDefault();
      ce.stopPropagation();
      return false;
    };

    n.querySelector('a').href = '#';
  });
}, {
  once: true,
});
