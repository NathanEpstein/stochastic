cat templates/scrubby_header.html

for JS in *.js
do
F=$(basename $JS .js)
echo "<div id='$F'></div>"
echo '<script type="text/scrubby">'
cat $JS | grep -v "require('../index')"
echo '</script>'
done

cat templates/scrubby_footer.html
