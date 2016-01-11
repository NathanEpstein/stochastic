cat templates/scrubby_header.html

for JS in *.js
do
F=$(basename $JS .js)

echo "<h2>$F</h2>"
echo "<div class='scrubbed' id='$F'></div>"
echo "<pre id='$F'></pre>"
echo '<script type="text/scrubby">'
cat $JS | grep -v "require('../index')"
echo '</script>'
done

cat templates/scrubby_footer.html
