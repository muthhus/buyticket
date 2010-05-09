function isLayerDisplay(layerName) //Public function
3{
4 if (obj=MM_findObj(layerName))
5 {
6 if (obj.style.visibility =='' || obj.style.visibility == 'hidden')
7 return false;
8 else
9 return true;
10 }
11 else
12 return false;
13}
14
15function MM_findObj(n, d)
16{
17//v4.01
18 var p,i,x;
19
20 if(!d)
21 d=document;
22
23 if((p=n.indexOf("?"))>0&&parent.frames.length)
24 {
25 d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);
26 }
27
28 if(!(x=d[n])&&d.all)
29 x=d.all[n];
30
31 for (i=0;!x&&i<d.forms.length;i++)
32 x=d.forms[i][n];
33
34 for(i=0;!x&&d.layers&&i<d.layers.length;i++)
35 x=MM_findObj(n,d.layers[i].document);
36
37 if(!x && d.getElementById)
38 x=d.getElementById(n);
39 return x;
40}
41
42
43
44
45function MM_showHideLayers() {
46//Public function
47//alert("hai");
48 var v,r,a,ps,cp,blnPageExisted,obj,args=MM_showHideLayers.arguments;
49 if (args[0] != null){
50 arrLayer = args[0].split(",");
51 v=args[1]; // get value 'show' or 'hide'
52 r=args[2]; // a list of remove class name
53 a=args[3]; // a list of add class name
54 col=args[4]; // boolean value to specify if other layers should keep opened or not (true/false)
55 ps=args[5]; // a list of page display the menu, separated by comma
56 cp=args[6]; // current page which include the menu
57
58
59
60
61 for (var i=0; i< arrLayer.length;i++){
62 if ((obj=MM_findObj(arrLayer[i]))!=null)
63 {
64 objStyle = obj.style
65 if (objStyle) {
66 if (v=='show' || blnPageExisted)
67 {
68 objStyle.visibility = 'visible';
69 objStyle.display = 'block';
70 }
71 else if (v=='hide' || blnPageExisted)
72 {
73 objStyle.visibility = 'hidden';
74 objStyle.display = 'none';
75 }
76 obj_b = document.getElementById(obj.id + "_button"); // get button object e.g. Layer_a_button
77
78
79
80 }
81 }
82 }
83 }
84}
85
86
87
88